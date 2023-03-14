import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "./common/modal/index";
import Header from "./component/Header";
import Footer from "./component/Footer";
import HomePage from "./component/HomePage";
import CreateProduct from "./component/CreateProduct";
import EditProduct from "./component/EditProduct";
import ProductDetail from "./common/productdetail";
import SignInContent from "./component/SignInContent";
import SignUpContent from "./component/SignUpContent";
import ForgotPassword from "./component/ForgotPassword/setPassword";
import PasswordConfirmation from "./component/PasswordConfirm/passwordConfirm";
import EmptyCart from "./component/emptyCart/index";
import ShoppingCart from "./component/ShoppingCart";
import CheckOut from "./component/CheckOutPage";
import LogOut from "./component/LogOut";
import ProductPhoto from "./component/Photo/Photo";
import ErrorBoundary from "./component/ErrorBoundary";
import { SIGNIN } from "./content/signin/index";
import { SIGNUP } from "./content/signup";
import { SETPW } from "./content/forgotpassword";
import "./App.css";

function App() {
  const [login, setLogin] = useState(false);
  //sign in /up
  const [openModal, setOpenModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [showPW, setShowPW] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  //cart
  const [openCart, setOpenCart] = useState(false);
  //need BE, put in user
  //coupon(if use), put in user
  const [cart, setCart] = useState([]);
  //buy quantity in cart
  //need BE, put in user
  const [buyQuant, setBuyQuant] = useState([]);
  //show buy quantity, need BE
  //need BE, put in user??
  const [addCart, setAddCart] = useState([]);
  //need to bind with user
  //adding cart, coupon into user database
  const [showDiscount, setShowDiscount] = useState(false);
  //final-> checkoutpage
  const [checkOut, setCheckOut] = useState(false);
  //view product page id
  const [pageId, setPageId] = useState(0);
  //admin logined
  const [adminLogined, setAdminLogined] = useState(false);
  //product
  const [product, setProduct] = useState([]);
  //selected product(show detail)
  const [selectedId, setSelectedId] = useState(null);
  //selected product(need edit)
  const [editId, setEditId] = useState(null);
  //edit page
  const [edited, setEdited] = useState(false);

  const total = cart.reduce((acc, item) => {
    return acc + Number(item.BuyQuantity);
  }, 0);

  //product home page loading
  useEffect(() => {
    const getProductInfo = async () => {
      const ProductFromServer = await fetchProductInfo();
      setProduct(ProductFromServer);
      /*const curAddCart = [];
      for (var i = 0; i < ProductFromServer.length; i++) {
        curAddCart.push(false);
      }
      setAddCart(curAddCart);*/
    };
    const getUserLogined = async () => {
      fetchLoginStatus();
    };
    const getAdminLogin = async () => {
      const adminLoginStatus = await fetchAdminLoginStatus();
      setAdminLogined(adminLoginStatus);
    };
    getProductInfo();
    getUserLogined();
    getAdminLogin();
  }, []);

  //user cart page loading
  useEffect(() => {
    const getCartInfo = async () => {
      const CartFromServer = await fetchUserInfo();
      setCart(CartFromServer.cart);
      setAddCart(CartFromServer.showAddCart);
      setBuyQuant(CartFromServer.buyQuant);
      setShowDiscount(CartFromServer.discount);
    };
    getCartInfo();
  }, []);

  const handleOnCancel = () => {
    if (showPW) {
      setShowPW(false);
    } else if (showConfirm) {
      setShowConfirm(false);
    } else {
      setOpenModal(false);
    }
  };

  const handleModalClickCancel = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      if (cart.length > 0 && !checkOut) {
        modUserCartInfo(cart);
        let idx;
        let showAddCart = [];
        for (var i = 0; i < product.length; i++) {
          idx = cart.findIndex((p) => p.Name === product[i].Name);
          if (idx >= 0) {
            showAddCart.push(true);
          } else if (idx === -1) {
            showAddCart.push(false);
          }
        }
        modShowAddCart(showAddCart);
        modBuyQuant(buyQuant);
        modDiscount(showDiscount);
      }
    }
    setOpenCart(false);
  };
  //FE: 3001 BE: 3002

  //fetchloginStatus
  const fetchLoginStatus = async () => {
    let auth = "Bearer " + localStorage.getItem("accessToken");
    const response = await fetch("/userLoginStatus", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: auth },
    });
    const result = await response.json();

    if (result.email !== "system@gmail.com") {
      setLogin(result.loginstatus);
    }
  };

  //fetchAdminLoginStatus
  const fetchAdminLoginStatus = async () => {
    const response = await fetch("/adminloginStatus");
    const data = await response.json();
    return data;
  };

  //fetchProductInfo
  const fetchProductInfo = async () => {
    const response = await fetch("/allProductInfo");
    const data = await response.json();

    return data;
  };

  //fetchUserInfo
  const fetchUserInfo = async () => {
    let auth = "Bearer " + localStorage.getItem("accessToken");
    const response = await fetch("/currentUserInfo", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: auth },
    });
    const data = await response.json();
    return data;
  };

  //mod user cart info
  const modUserCartInfo = async (cartInfo) => {
    let auth = "Bearer " + localStorage.getItem("accessToken");
    try {
      const response = await fetch("/modUserCartInfo", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: auth },
        body: JSON.stringify({ cart: cartInfo }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  //mod addCart
  const modShowAddCart = async (showAddCart) => {
    let auth = "Bearer " + localStorage.getItem("accessToken");
    try {
      const response = await fetch("/modShowAddCart", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: auth },
        body: JSON.stringify({ showAddCart: showAddCart }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  //mod buyQuant
  const modBuyQuant = async (buyQuant) => {
    let auth = "Bearer " + localStorage.getItem("accessToken");
    try {
      const response = await fetch("/modBuyQuant", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: auth },
        body: JSON.stringify({ buyQuant: buyQuant }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  //mod discount
  const modDiscount = async (discount) => {
    let auth = "Bearer " + localStorage.getItem("accessToken");
    try {
      const response = await fetch("/modDiscount", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: auth },
        body: JSON.stringify({ discount: discount }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Header
        openModal={setOpenModal}
        logined={login}
        setOpenCart={setOpenCart}
        openCart={openCart}
        cart={cart}
        showDiscount={showDiscount}
        checkOut={checkOut}
      />
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <HomePage
                product={product}
                setSelectedId={setSelectedId}
                setEdit={setEdited}
                setEditId={setEditId}
                adminLogined={adminLogined}
                setPageId={setPageId}
                pageId={pageId}
                setProduct={setProduct}
                setCart={setCart}
                cart={cart}
                buyQuant={buyQuant}
                setBuyQuant={setBuyQuant}
                setAddCart={setAddCart}
                addCart={addCart}
              />
            }
          ></Route>

          <Route
            exact
            path="/photo"
            element={
              <ErrorBoundary>
                <ProductPhoto />
              </ErrorBoundary>
            }
          ></Route>

          <Route
            exact
            path="/createproduct"
            element={
              <CreateProduct
                setProduct={setProduct}
                setAddCart={setAddCart}
                addCart={addCart}
              />
            }
          ></Route>
          <Route
            exact
            path="/editproduct/:id"
            element={
              <EditProduct
                edit={edited}
                setEdit={setEdited}
                product={product}
                editId={editId}
                setProduct={setProduct}
              />
            }
          ></Route>
          <Route
            exact
            path="/productDetail/:id"
            element={
              <ProductDetail
                product={product}
                index={selectedId}
                setEdit={setEdited}
                setEditId={setEditId}
                adminLogined={adminLogined}
                setCart={setCart}
                cart={cart}
                buyQuant={buyQuant}
                setBuyQuant={setBuyQuant}
                setAddCart={setAddCart}
                addCart={addCart}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      <Modal
        titleText={
          signUpModal
            ? SIGNUP.HEADER
            : showPW
            ? SETPW.HEADER
            : login
            ? "LogOut"
            : showConfirm
            ? ""
            : SIGNIN.HEADER
        }
        openModal={openModal}
        onCancel={handleOnCancel}
        isCart={false}
      >
        {signUpModal ? (
          <SignUpContent setSignUpModal={setSignUpModal} />
        ) : showPW ? (
          <ForgotPassword
            setShowConfirm={setShowConfirm}
            setShowPW={setShowPW}
          />
        ) : showConfirm ? (
          <PasswordConfirmation />
        ) : login ? (
          <LogOut
            onCancel={handleOnCancel}
            setAdminLogined={setAdminLogined}
            setLogin={setLogin}
            setCart={setCart}
            setAddCart={setAddCart}
            setBuyQuant={setBuyQuant}
            setShowDiscount={setShowDiscount}
            modShowAddCart={modShowAddCart}
            product={product}
          />
        ) : (
          <SignInContent
            setSignUpModal={setSignUpModal}
            setShowPW={setShowPW}
            setOpenModal={setOpenModal}
            setLogin={setLogin}
            setAdminLogined={setAdminLogined}
          />
        )}
      </Modal>
      <Modal
        titleText={`Cart(${total})`}
        openModal={openCart}
        onCancel={handleModalClickCancel}
        height={cart.length > 0 && !checkOut ? 600 : 300}
        mobileH={cart.length > 0 && !checkOut ? 600 : 350}
        mobileW={cart.length > 0 && !checkOut ? 450 : 250}
        isShoppingCart={cart.length > 0 && !checkOut}
      >
        {cart.length === 0 ? (
          <EmptyCart />
        ) : checkOut ? (
          <CheckOut
            product={product}
            setCheckOut={setCheckOut}
            onCancel={() => setOpenCart(false)}
            modUserCartInfo={modUserCartInfo}
            modShowAddCart={modShowAddCart}
            modBuyQuant={modBuyQuant}
            modDiscount={modDiscount}
          />
        ) : (
          <ShoppingCart
            cartProduct={cart}
            setCart={setCart}
            buyQuant={buyQuant}
            setBuyQuant={setBuyQuant}
            product={product}
            setAddCart={setAddCart}
            addCart={addCart}
            showDiscount={showDiscount}
            setShowDiscount={setShowDiscount}
            setCheckOut={setCheckOut}
            logined={login}
          />
        )}
      </Modal>
      <Footer />
    </div>
  );
}

export default App;
