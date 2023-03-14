import { useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import "./index.css";
const CellCart = ({
  curProduct,
  setCart,
  cart,
  buyQuant,
  setBuyQuant,
  product,
  setAddCart,
  addCart,
  cartId,
}) => {
  var index = buyQuant.findIndex((p) => p.Name == curProduct.Name);
  var productId = product.findIndex((p) => p.Name == curProduct.Name);
  //console.log(buyQuant);
  const updateBuyItem = (quant = 0) => {
    const buyItem = {
      Name: curProduct.Name,
      Price: curProduct.Price,
      Link: curProduct.Link,
      BuyQuantity: quant,
    };
    //console.log(buyItem);
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].Name === buyItem.Name) {
        setCart([...cart.slice(0, i), buyItem, ...cart.slice(i + 1)]);
        break;
      }
    }
    if (i == cart.length) {
      setCart([...cart, buyItem]);
    }
    //console.log(cart);
  };
  const decreaseProduct = () => {
    if (buyQuant[index].Buy <= 1) {
      setCart([...cart.slice(0, cartId), ...cart.slice(cartId + 1)]);
      setBuyQuant([
        ...buyQuant.slice(0, cartId),
        ...buyQuant.slice(cartId + 1),
      ]);

      setAddCart([
        ...addCart.slice(0, productId),
        false,
        ...addCart.slice(productId + 1),
      ]);
    } else {
      const newItemQuant2 = {
        Name: curProduct.Name,
        Buy: buyQuant[index].Buy - 1,
      };
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
      Name: curProduct.Name,
      Buy: buyQuant[index].Buy + 1,
    };
    setBuyQuant([
      ...buyQuant.slice(0, index),
      newItemQuant3,
      ...buyQuant.slice(index + 1),
    ]);
    updateBuyItem(buyQuant[index].Buy + 1);
  };

  const handleClickRemove = () => {
    setCart([...cart.slice(0, cartId), ...cart.slice(cartId + 1)]);
    //console.log("cart", cart);
    setBuyQuant([...buyQuant.slice(0, cartId), ...buyQuant.slice(cartId + 1)]);
    //console.log("buyquant", buyQuant);
    setAddCart([
      ...addCart.slice(0, productId),
      false,
      ...addCart.slice(productId + 1),
    ]);
  };
  return (
    <div className="cellcart-container">
      <div className="cellcart-img">
        <img
          alt="not fount"
          width={"80px"}
          height={"80px"}
          src={curProduct.Link}
        />
      </div>
      <div className="cellcart-content1">
        <div>
          <label className="cellcart-name">{curProduct.Name}</label>
        </div>
        <div className="cellcart-price-container">
          <label className="cellcart-price">${curProduct.Price}</label>
        </div>
      </div>
      <div className="cellcart-content2">
        <div className="cellcart-update">
          <button onClick={decreaseProduct} className="cellcart-button">
            <IoMdRemove />
          </button>
          <button className="cellcart-button">
            {index >= 0 && buyQuant[index].Buy}
          </button>
          <button onClick={increaseProduct} className="cellcart-button">
            <IoMdAdd />
          </button>
        </div>
        <div className="cellcart-remove">
          <a href="#" className="remove" onClick={handleClickRemove}>
            Remove
          </a>
        </div>
      </div>
    </div>
  );
};
export default CellCart;
