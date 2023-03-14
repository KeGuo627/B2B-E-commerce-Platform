import { useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { ajaxConfigHelper } from "../../helper/index";
import "../../App.js";
import "./index.css";
const AddProduct = ({
  product,
  setCart,
  cart,
  productId,
  addCart,
  setAddCart,
  buyQuant,
  setBuyQuant,
}) => {
  let index = buyQuant.findIndex((p) => p.Name == product.Name);
  let cartId = cart.findIndex((p) => p.Name === product.Name);

  const updateBuyItem = (quant = 0) => {
    const buyItem = {
      Name: product.Name,
      Price: product.Price,
      Link: product.Link,
      BuyQuantity: quant,
    };
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].Name === buyItem.Name) {
        setCart([...cart.slice(0, i), buyItem, ...cart.slice(i + 1)]);
        break;
      }
    }
    if (i == cart.length) {
      setCart([...cart, buyItem]);
    }
    console.log(cart);
  };

  const decreaseProduct = () => {
    const newItemQuant2 = {
      Name: product.Name,
      Buy: buyQuant[index].Buy - 1,
    };
    if (buyQuant[index].Buy <= 1) {
      setCart([...cart.slice(0, cartId), ...cart.slice(cartId + 1)]);
      //console.log("cart", cart);
      setBuyQuant([
        ...buyQuant.slice(0, cartId),
        ...buyQuant.slice(cartId + 1),
      ]);
      //console.log("buyquant", buyQuant);
      setAddCart([
        ...addCart.slice(0, productId),
        false,
        ...addCart.slice(productId + 1),
      ]);
    } else {
      setBuyQuant([
        ...buyQuant.slice(0, index),
        newItemQuant2,
        ...buyQuant.slice(index + 1),
      ]);
      updateBuyItem(buyQuant[index].Buy - 1);
    }
  };
  const increaseProduct = () => {
    const newItemQuant3 = {
      Name: product.Name,
      Buy: buyQuant[index].Buy + 1,
    };
    setBuyQuant([
      ...buyQuant.slice(0, index),
      newItemQuant3,
      ...buyQuant.slice(index + 1),
    ]);
    updateBuyItem(buyQuant[index].Buy + 1);
  };
  return (
    <div className="button1">
      <button onClick={decreaseProduct} className="minusButton">
        <IoMdRemove />
      </button>
      <button className="numberButton">
        {index >= 0 && buyQuant[index].Buy}
      </button>
      <button onClick={increaseProduct} className="plusButton">
        <IoMdAdd />
      </button>
    </div>
  );
};
export default AddProduct;
