import "./index.css";
const LogOut = ({
  onCancel,
  setLogin,
  setCart,
  setAddCart,
  setBuyQuant,
  setShowDiscount,
  setAdminLogined,
  product,
}) => {
  //mod user info

  const fetchLogout = async () => {
    let auth = "Bearer " + localStorage.getItem("accessToken");
    const response = await fetch("/logoutUser", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: auth },
    });
    const result = await response.json();
    localStorage.setItem("accessToken", result.accessToken);
  };

  const handleOnClick = () => {
    fetchLogout();
    setAdminLogined(false);
    setLogin(false);
    setCart([]);
    const curAddCart = [];
    for (var i = 0; i < product.length; i++) {
      curAddCart.push(false);
    }
    setAddCart(curAddCart);
    setBuyQuant([]);
    setShowDiscount(false);
    onCancel();
  };

  return (
    <div className="logout-container">
      <h2>Do you want to Sign out?</h2>
      <button onClick={handleOnClick} className="logout-button">
        Sign Out
      </button>
    </div>
  );
};
export default LogOut;
