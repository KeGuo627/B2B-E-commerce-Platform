import { useState } from "react";
import CellCart from "../../common/cellcart/index";
import { CART } from "../../content/cart/index";
import "./index.css";
const ShoppingCart = ({
  cartProduct,
  setCart,
  buyQuant,
  setBuyQuant,
  product,
  setAddCart,
  addCart,
  showDiscount,
  setShowDiscount,
  setCheckOut,
  logined,
}) => {
  const [inputCoupon, setInputCoupon] = useState("");

  const handleClickApply = () => {
    if (inputCoupon === "20 DOLLAR OFF") {
      setShowDiscount(true);
    }
  };
  const totalPrice = cartProduct.reduce((acc, item) => {
    return acc + Number(item.Price) * Number(item.BuyQuantity);
  }, 0);
  const discount = 20;
  const tax = (totalPrice * 0.1).toFixed(2);
  const finalPrice = totalPrice + Number(tax);

  const handleClickCheckout = () => {
    if (!logined) {
      alert("Please sign in");
    } else {
      setCheckOut(true);
    }
  };
  return (
    <>
      <div className="shoppingcart-container">
        {cartProduct.map((item, index) => {
          return (
            item.BuyQuantity > 0 && (
              <CellCart
                curProduct={item}
                setCart={setCart}
                cart={cartProduct}
                buyQuant={buyQuant}
                setBuyQuant={setBuyQuant}
                product={product}
                setAddCart={setAddCart}
                addCart={addCart}
                cartId={index}
              />
            )
          );
        })}
      </div>
      <div className="coupon-container">
        <h4>{CART.COUPON}</h4>
        <input
          value={inputCoupon}
          className="shoppingcart-input"
          placeholder="20 DOLLAR OFF"
          onChange={(e) => setInputCoupon(e.target.value)}
        />
        <button className="shoppingcart-button1" onClick={handleClickApply}>
          {CART.APPLY}
        </button>
      </div>
      <hr />
      <div className="shoppingcart-price1">
        <div className="shoppingcart-price2">
          <label>{CART.SUBTOTAL}</label>
          <label className="shoppingcart-label1">${totalPrice}</label>
        </div>
        <div className="shoppingcart-price2">
          <label>{CART.TAX}</label>
          <label className="shoppingcart-label2">${tax}</label>
        </div>
        {showDiscount && (
          <div className="shoppingcart-price2">
            <label>{CART.DISCOUNT}</label>
            <label className="shoppingcart-label3">${discount}</label>
          </div>
        )}
        <div className="shoppingcart-price2">
          <label>{CART.ESTTOTAL}</label>
          <label className="shoppingcart-label4">
            ${showDiscount ? Number(finalPrice) - discount : Number(finalPrice)}
          </label>
        </div>
      </div>
      <div className="shoppingcart-buttoncontainer">
        <button className="shoppingcart-button" onClick={handleClickCheckout}>
          {CART.BUTTON}
        </button>
      </div>
    </>
  );
};
export default ShoppingCart;
