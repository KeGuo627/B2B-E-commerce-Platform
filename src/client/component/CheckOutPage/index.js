import "./index.css";
const CheckOut = ({
  product,
  setCheckOut,
  onCancel,
  modUserCartInfo,
  modShowAddCart,
  modBuyQuant,
  modDiscount,
}) => {
  const handleOnClick = () => {
    onCancel();
    setCheckOut(false);
    modUserCartInfo([]);
    const miniAddCart = [];
    for (var i = 0; i < product.length; i++) {
      miniAddCart.push(false);
    }
    console.log(miniAddCart);
    modShowAddCart(miniAddCart);
    modBuyQuant([]);
    const showDiscount = false;
    modDiscount(showDiscount);
    window.location.reload(false);
  };
  return (
    <>
      <div className="h2-container">
        <h3 className="checkout-paragraph">Thank you shopping with us!</h3>
      </div>
      <div className="HomeButton-container">
        <button className="Homebutton" onClick={handleOnClick}>
          Home
        </button>
      </div>
    </>
  );
};
export default CheckOut;
