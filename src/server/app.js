var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { v4: uuidv4 } = require("uuid");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const jwt = require("jsonwebtoken");
//connect to database
const connectToMongoose = require("./database/connect");
const infos = require("./database/model");
//console.log(infos);
const userInformation = infos.userInfo;
const productInformation = infos.productInfo;
console.log(userInformation);
console.log(productInformation);
connectToMongoose();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use("/", indexRouter);
//app.use("/users", usersRouter);

//admin login status
let adminLoginStatus = false;
//1. get admin login status(GET)
app.get("/adminloginStatus", (_, res) => {
  console.log("get Admin Login status");
  res.json(adminLoginStatus);
});

//UserInfo
//1.getUserInfo => return all userinfo => GET
//2.addUserInfo => add a new use in the BE, return a boolean flag/status => POST
//3. modUserInfo => mod the login status in the BE, return a boolean flag/status => PUT

//mock users database

// user part
const verifyUserInfoPayload = (req, isAddInfo = false) => {
  return isAddInfo
    ? req.body &&
        req.body.email &&
        req.body.password &&
        req.body.logined !== undefined
    : req.body && req.body.email && req.body.password;
};

//1. get all usersInfo(GET)
app.get("/allUserInfo", async (_, res) => {
  const userData = await userInformation.find({});
  const userInfos = userData.map(
    ({ email, password, logined, cart, showAddCart, buyQuant, discount }) => {
      return {
        email,
        password,
        logined,
        cart,
        showAddCart,
        buyQuant,
        discount,
      };
    }
  );
  res.json(userInfos);
});

//2. add a user info(POST)
//if want to get email/password/logined => req.body.email
app.post("/addUserInfo", async (req, res) => {
  //happy path
  if (verifyUserInfoPayload(req, true)) {
    const userData = await userInformation.find({});
    let emails = userData.map((user) => user.email);
    if (emails.includes(req.body.email)) {
      res.status(400).json({
        message: "failed: The account already existed!",
        status: 400,
      });
    } else {
      const newUserItem = new userInformation({
        email: req.body.email,
        password: req.body.password,
        logined: req.body.logined,
        cart: req.body.cart,
        showAddCart: req.body.showAddCart,
        buyQuant: req.body.buyQuant,
        discount: req.body.discount,
      });
      const newUser = await newUserItem.save();
      if (newUser === newUserItem) {
        res
          .status(200)
          .json({ message: "succeed add a user account", status: 200 });
      }
      return;
    }
  } else {
    //error handling
    res.status(400).json({
      message: "failed: Please enter the email and password",
      status: 400,
    });
  }
});

const genereateAcessToken = ({ curEmail, curLogined }) => {
  return jwt.sign({ email: curEmail, logined: curLogined }, "mySecretKey");
};

//2. mod a user info(PUT)(login)
app.put("/modUserInfo", async (req, res) => {
  //happy path
  if (verifyUserInfoPayload(req)) {
    const curEmail = req.body.email;
    const curPassword = req.body.password;
    //log out previous system account
    const queryPreResult = await userInformation.findOne({
      email: "system@gmail.com",
    });
    const { modifiedPreCount } = await queryPreResult.updateOne({
      logined: false,
    });

    //log in current user account
    const queryResult = await userInformation.findOne({ email: curEmail });

    if (queryResult) {
      const { modifiedCount } = await queryResult.updateOne({
        logined: true,
      });
      if (modifiedCount) {
        //login successfully
        //check if admin login
        if (curEmail === "admin@gmail.com" && curPassword === "Admin@001") {
          adminLoginStatus = true;
        }
        //accessToken

        const accessToken = genereateAcessToken({ curEmail, curLogined: true });
        res.json({
          message: "succeed: successfully signed in",
          accessToken: accessToken,
          status: 200,
        });
        return;
      } else {
        res.status(400).json({
          message: "failed: modify the login ",
        });
        return;
      }
    } else {
      res.status(400).json({
        message: "failed: email or password doesn't exist ",
      });
    }
  } else {
    //error handling
    res.status(400).json({
      message: "failed: please enter your password and email",
    });
  }
});

//verify method
const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    //Get token from array
    const bearerToken = authHeader.split(" ")[1];
    //Set the token
    req.token = bearerToken;
    //next middleware
    next();
  } else {
    res.status(401).json("You are not authenticated.");
  }
};

//login status by email, password
let curUserEmail;
let loginStatus;
//3. POST login status(POST)
app.post("/userLoginStatus", verify, async (req, res) => {
  //happy path
  if (!req.token) {
    curEmail = "system@gmail.com";
    res.status(200).json({ loginStatus: false });
  } else {
    jwt.verify(req.token, "mySecretKey", (err, authData) => {
      if (err) {
        res.status(403).json("Token is invalid.");
      } else {
        loginStatus = authData.logined;
        curUserEmail = authData.email;
        if (curUserEmail === "admin@gmail.com") {
          adminLoginStatus = true;
        }
        res.status(200).json({
          message: "User has authenticated",
          email: curUserEmail,
          adminLoginStatus: adminLoginStatus,
          loginstatus: loginStatus,
        });
      }
    });
  }
});

//4.log out user
app.put("/logoutUser", verify, async (req, res) => {
  //happy path
  let curEmail;

  jwt.verify(req.token, "mySecretKey", (err, authData) => {
    if (err) {
      res.status(403).json("Token is invalid.");
    } else {
      curEmail = authData.email;
    }
  });

  //log out previous user account
  const queryPreResult = await userInformation.findOne({ email: curEmail });
  const { modifiedPreCount } = await queryPreResult.updateOne({
    logined: false,
  });
  if (curEmail === "admin@gmail.com") {
    adminLoginStatus = false;
  }

  //log in system account

  const queryResult = await userInformation.findOne({
    email: "system@gmail.com",
  });
  if (queryResult) {
    const { modifiedCount } = await queryResult.updateOne({
      logined: true,
    });
    if (modifiedCount) {
      //login system account successfully
      //accessToken

      const accessToken = genereateAcessToken({
        curEmail: "system@gmail.com",
        curLogined: true,
      });
      res.json({
        message: "succeed: successfully system signed in",
        accessToken: accessToken,
        status: 200,
      });
      return;
    } else {
      res.status(400).json({
        message: "failed: modify the login ",
      });
      return;
    }
  } else {
    res.status(400).json({
      message: "failed: email or password doesn't exist ",
    });
  }
});

//4. fetch current user info
//need input accessToken
app.get("/currentUserInfo", verify, async (req, res) => {
  let curEmail;
  if (!req.token) {
    curEmail = "system@gmail.com";
  } else {
    jwt.verify(req.token, "mySecretKey", (err, authData) => {
      if (err) {
        res.status(403).json("Token is invalid.");
      } else {
        curEmail = authData.email;
      }
    });
  }
  const queryResult = await userInformation.findOne({ email: curEmail });
  res.status(200).json(queryResult);
  return;
});

//5. Logout current user

//shopping cart
//1. mod user cart info
//need input accessToken
app.put("/modUserCartInfo", verify, async (req, res) => {
  //happy path
  //req: token as header, cart
  if (req.body && req.body.cart) {
    let curEmail;
    jwt.verify(req.token, "mySecretKey", (err, authData) => {
      if (err) {
        res.status(403).json("Token is invalid.");
      } else {
        curEmail = authData.email;
      }
    });
    if (curEmail !== "system@gmail.com") {
      const queryResult = await userInformation.findOne({ email: curEmail });
      if (queryResult) {
        const { modifiedCount } = await queryResult.updateOne({
          cart: req.body.cart,
        });
        if (modifiedCount) {
          res.status(200).json("succeed: mod user cart info");
          return;
        } else {
          res.status(400).json("failed: fail to modify the user's cart");
          return;
        }
      } else {
        res.status(400).json("failed: couldn't find the user");
        return;
      }
    } else {
      res.status(200).json("system account");
      return;
      //error handling
    }
  } else {
    res.status(400).json({
      message: "failed: cart info lost ",
    });
  }
});

//2. mod showAddCart
app.put("/modShowAddCart", verify, async (req, res) => {
  //happy path
  //req: showAddCart
  if (req.body && req.body.showAddCart) {
    let curEmail;
    jwt.verify(req.token, "mySecretKey", (err, authData) => {
      if (err) {
        res.status(403).json("Token is invalid.");
      } else {
        curEmail = authData.email;
      }
    });
    if (curEmail !== "system@gmail.com") {
      const queryResult = await userInformation.findOne({ email: curEmail });
      if (queryResult) {
        const { modifiedCount } = await queryResult.updateOne({
          showAddCart: req.body.showAddCart,
        });
        if (modifiedCount) {
          res.status(200).json("succeed: mod user showAddCart info");
          return;
        } else {
          res.status(400).json("failed: fail to modify the user's showAddCart");
          return;
        }
      } else {
        res.status(400).json("failed: couldn't find the user");
        return;
      }
    } else {
      res.status(200).json({
        message: "system account ",
      });
      return;
    }
  }
  //error handling
  res.status(400).json({
    message: "failed: showAddCart info lost ",
  });
});

//3. mod buyQuant
app.put("/modBuyQuant", verify, async (req, res) => {
  //happy path
  //req: buyQuant
  if (req.body && req.body.buyQuant) {
    let curEmail;
    jwt.verify(req.token, "mySecretKey", (err, authData) => {
      if (err) {
        res.status(403).json("Token is invalid.");
      } else {
        curEmail = authData.email;
      }
    });
    if (curEmail !== "system@gmail.com") {
      const queryResult = await userInformation.findOne({ email: curEmail });
      if (queryResult) {
        const { modifiedCount } = await queryResult.updateOne({
          buyQuant: req.body.buyQuant,
        });
        if (modifiedCount) {
          res.status(200).json("succeed: mod user buyQuant info");
          return;
        } else {
          res.status(400).json("failed: fail to modify the user's buyQuant");
          return;
        }
      } else {
        res.status(400).json("failed: couldn't find the user");
        return;
      }
    } else {
      res.status(200).json({
        message: "system account ",
      });
      return;
    }
  }
  //error handling
  res.status(400).json({
    message: "failed: buyQuant info lost ",
  });
});

//4. mod discount
app.put("/modDiscount", verify, async (req, res) => {
  //happy path
  //req: email, discount
  if (req.body && req.body.discount !== undefined) {
    let curEmail;
    jwt.verify(req.token, "mySecretKey", (err, authData) => {
      if (err) {
        res.status(403).json("Token is invalid.");
      } else {
        curEmail = authData.email;
      }
    });
    if (curEmail !== "system@gmail.com") {
      const queryResult = await userInformation.findOne({ email: curEmail });
      if (queryResult) {
        const { modifiedCount } = await queryResult.updateOne({
          discount: req.body.discount,
        });
        if (modifiedCount) {
          res.status(200).json("succeed: mod user discount info");
          return;
        } else {
          res.status(400).json("failed: fail to modify the user's discount");
          return;
        }
      } else {
        res.status(400).json("failed: couldn't find the user");
        return;
      }
    } else {
      res.status(200).json({
        message: "system account ",
      });
      return;
    }
  }
  //error handling
  res.status(400).json({
    message: "failed: discount info lost ",
  });
});

//ProductInfo
//1.getProductInfo => return all productInfo => GET
//2.addProductInfo => add a new product in the BE, return a boolean flag/status => POST
//3.modProductInfo => mod the existed product in the BE, return a boolean flag/status => PUT

let productInfos;

const verifyProductInfoPayload = (req, isAddProduct = false) => {
  return isAddProduct
    ? req.body && req.body.Name && req.body.Price && req.body.Link
    : req.body && req.body.Name && req.body.updatedProduct;
};
//1. get all product info
app.get("/allProductInfo", async (_, res) => {
  const productData = await productInformation.find({});
  productInfos = productData.map(
    ({ Name, Description, Category, Price, Quantity, Link, index }) => {
      return {
        Name,
        Description,
        Category,
        Price,
        Quantity,
        Link,
        index,
      };
    }
  );
  res.json(productData);
});

//2. add a new product info(POST)
app.post("/addProductInfo", async (req, res) => {
  //happy path
  if (verifyProductInfoPayload(req, true)) {
    const newProductItem = new productInformation({
      index: uuidv4(),
      Name: req.body.Name,
      Description: req.body.Description,
      Category: req.body.Category,
      Price: req.body.Price,
      Quantity: req.body.Quantity,
      Link: req.body.Link,
    });
    const newProduct = await newProductItem.save();
    if (newProduct === newProductItem) {
      res.status(200).json({ message: "succeed add a product" });
    }
    return;
  }

  //error handling
  res.status(400).json({
    message:
      "failed:add a product account. Must have product name, price and link",
  });
});

//3. mod a product info(PUT)
app.put("/modProductInfo", async (req, res) => {
  //req: _id, updatedProduct
  if (verifyProductInfoPayload(req)) {
    const Name = req.body.Name;
    const updatedProduct = req.body.updatedProduct;
    const queryResult = await productInformation.findOne({ Name: Name });
    if (queryResult) {
      const { modifiedCount } = await queryResult.updateOne({
        Name: updatedProduct.Name,
        Description: updatedProduct.Description,
        Category: updatedProduct.Category,
        Price: updatedProduct.Price,
        Quantity: updatedProduct.Quantity,
        Link: updatedProduct.Link,
      });
      if (modifiedCount) {
        //edit successfully
        res.status(200).json({
          message: "succeed: modify the existed product",
          status: 200,
        });
        return;
      } else {
        res.status(400).json({
          message: "failed: modify the product ",
          status: 400,
        });
        return;
      }
    } else {
      res.status(400).json({
        message: "failed: product doesn't exist ",
        status: 400,
      });
    }
  } else {
    //error handling
    res.status(400).json({
      message: "failed: please enter updatedProduct and index",
      status: 400,
    });
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
