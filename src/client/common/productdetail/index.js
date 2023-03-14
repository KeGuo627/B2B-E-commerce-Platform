import { NavLink } from "react-router-dom";
import { PRODUCTDETAIL } from "../../content/productdetail";
import AddProduct from "../addproduct";
import "./index.css";
const ProductDetail = ({
  product,
  index,
  setEdit,
  setEditId,
  adminLogined,
  setCart,
  cart,
  buyQuant,
  setBuyQuant,
  setAddCart,
  addCart,
}) => {
  const updateBuyItem = (quant = 0) => {
    const buyItem = {
      Name: product[index].Name,
      Price: product[index].Price,
      Link: product[index].Link,
      BuyQuantity: quant,
    };

    setCart([...cart, buyItem]);

    //console.log(cart);
  };
  const handleAddCart = () => {
    setAddCart([...addCart.slice(0, index), true, ...addCart.slice(index + 1)]);
    for (var i = 0; i < buyQuant.length; i++) {
      if (buyQuant[i].Name === product[index].Name) {
        break;
      }
    }
    if (i === buyQuant.length) {
      const newItem = {
        Name: product[index].Name,
        Buy: 1,
      };
      setBuyQuant([...buyQuant, newItem]);
      updateBuyItem(1);
    }
  };

  const handleShowEdit = () => {
    setEdit(true);
    setEditId(index);
  };
  return (
    <div className="productdetail-container">
      <div className="productdetail-header">{PRODUCTDETAIL.TITLE}</div>
      <div className="productdetail-content">
        <div className="productdetail-photo">
          <img
            alt="not fount"
            width={"350px"}
            height={"350px"}
            src={product[index].Link}
          />
        </div>
        <div className="productdetail-info">
          <h5>{product[index].Category}</h5>
          <h2 className="name">{product[index].Name}</h2>
          <h2 className="price">${product[index].Price}</h2>
          {product[index].Quantity === 0 && (
            <h2 className="ShowQuantity">Out of Stock</h2>
          )}

          <p>{product[index].Description}</p>
          <div className="productdetail-buttons">
            {addCart[index] ? (
              <AddProduct
                product={product[index]}
                setCart={setCart}
                cart={cart}
                productId={index}
                addCart={addCart}
                setAddCart={setAddCart}
                buyQuant={buyQuant}
                setBuyQuant={setBuyQuant}
              />
            ) : (
              <button className="productdetail-button1" onClick={handleAddCart}>
                {PRODUCTDETAIL.BUTTON1}
              </button>
            )}

            {adminLogined && (
              <NavLink to={`/editproduct/${index}`}>
                <button
                  onClick={handleShowEdit}
                  className={
                    addCart
                      ? "productdetail-button2-review"
                      : "productdetail-button2"
                  }
                >
                  {PRODUCTDETAIL.BUTTON2}
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
