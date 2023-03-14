import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FaSistrix } from "react-icons/fa";
import { BiUser, BiCartAlt } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import { HEADERINFO } from "../content/header/index";
import "./styles/header.css";

const Header = ({
  openModal,
  logined,
  setOpenCart,
  openCart,
  cart,
  showDiscount,
  checkOut,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const totalQuant = cart.reduce((acc, item) => {
    return acc + Number(item.BuyQuantity);
  }, 0);
  const totalPrice = cart.reduce((acc, item) => {
    return acc + Number(item.Price) * Number(item.BuyQuantity);
  }, 0);
  const finalPrice = totalPrice * 0.1 + totalPrice;
  const handleOpenCart = () => {
    if (!logined) {
      alert("Please sign in first");
    }
    setOpenCart(true);
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <div className="Title">{isMobile ? "M" : HEADERINFO.TITLE}</div>
        <div className="subTitle">{HEADERINFO.SUBTITLE}</div>

        <div className="search-container">
          <input
            type="text"
            placeholder={HEADERINFO.PLACEHOLDER}
            name="search"
            className="inputbar"
          />

          <i>
            <FaSistrix color="black" />
          </i>
        </div>

        <Nav className="nav-signin">
          <i>
            <BiUser color="white" />
          </i>
          <button
            className="btn-signin"
            type="submit"
            onClick={() => openModal(true)}
          >
            {logined ? HEADERINFO.SIGNOUT : HEADERINFO.SIGNIN}
          </button>
        </Nav>

        <Nav className="nav-cart">
          <i onClick={handleOpenCart}>
            <BiCartAlt color="white" />
          </i>
          {cart.length > 0 && (
            <span class="badge badge-warning" id="lblCartCount">
              {" "}
              {totalQuant}{" "}
            </span>
          )}
          <label>
            ${checkOut ? 0 : showDiscount ? finalPrice - 20 : finalPrice}
          </label>
        </Nav>
      </Navbar>
    </header>
  );
};
export default Header;
