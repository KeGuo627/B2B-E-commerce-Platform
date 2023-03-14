import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { HOMEPAGEINFO } from "../../content/homepage";
import ProductCell from "../../common/listcell";
import "../../App";
import "./index.css";
const HomePage = ({
  product,
  setSelectedId,
  setEdit,
  setEditId,
  adminLogined,
  setPageId,
  pageId,
  setProduct,
  setCart,
  cart,
  buyQuant,
  setBuyQuant,
  setAddCart,
  addCart,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const [dropDownValue, setDropDownValue] = useState(null);
  const [startPageId, setStartPageId] = useState(1);

  //fetchProductInfo
  const fetchProductInfo = async () => {
    const response = await fetch("/allProductInfo");
    const data = await response.json();
    return data;
  };
  const getProductInfo = async () => {
    const ProductFromServer = await fetchProductInfo();
    setProduct(ProductFromServer);
    updateAddCart(ProductFromServer);
  };

  const updateAddCart = (ProductShowed) => {
    let showAddCart = [];
    for (var i = 0; i < ProductShowed.length; i++) {
      console.log(cart);
      let idx = cart.findIndex((p) => p.Name === ProductShowed[i].Name);
      if (idx >= 0) {
        showAddCart.push(true);
      } else if (idx === -1) {
        showAddCart.push(false);
      }
    }
    setAddCart(showAddCart);
    //modShowAddCart(showAddCart);
  };
  let ProductShowed = product;
  const changeStatus = (e) => {
    setDropDownValue(e.target.value);
    if (e.target.value === "arrayValue2") {
      ProductShowed.sort((a, b) =>
        Number(a.Price) > Number(b.Price) ? 1 : -1
      );
      updateAddCart(ProductShowed);
    } else if (e.target.value === "arrayValue3") {
      ProductShowed.sort((a, b) =>
        Number(a.Price) > Number(b.Price) ? -1 : 1
      );
      updateAddCart(ProductShowed);
    } else {
      getProductInfo();
    }
  };

  //change page

  const switchPageAesc = () => {
    setStartPageId((prev) => prev + 1);
  };
  const switchPageDesc = () => {
    if (startPageId > 1) {
      setStartPageId((prev) => prev - 1);
    } else {
      setStartPageId(1);
    }
  };

  return (
    <>
      <div className="homepage-container">
        <div className="homepage-header">
          <label className="title-label">{HOMEPAGEINFO.TITLE}</label>
        </div>
        <div className="homepage-dropdown">
          <select
            className="homepage-dropdownlist"
            value={dropDownValue}
            onChange={changeStatus}
          >
            <option value="arrayValue1">{HOMEPAGEINFO.DROPDOWN[0]}</option>
            <option value="arrayValue2">{HOMEPAGEINFO.DROPDOWN[1]}</option>
            <option value="arrayValue3">{HOMEPAGEINFO.DROPDOWN[2]}</option>
          </select>
        </div>
        <div className="homepage-button-container">
          {adminLogined && (
            <NavLink to="/createproduct">
              <button className="homepage-button">
                {HOMEPAGEINFO.BUTTONTITLE}
              </button>
            </NavLink>
          )}
        </div>
      </div>
      <div className="homepage-content">
        <div class="grid-item">
          {ProductShowed[(0 % 9) + 10 * pageId] && (
            <ProductCell
              product={ProductShowed[(0 % 9) + 10 * pageId]}
              onClick1={() => {}}
              onClick2={() => {}}
              onClick3={() => {}}
              setSelectedId={setSelectedId}
              index={(0 % 9) + 10 * pageId}
              setEdit={setEdit}
              setEditId={setEditId}
              className="grid-box"
              adminLogined={adminLogined}
              setCart={setCart}
              cart={cart}
              buyQuant={buyQuant}
              setBuyQuant={setBuyQuant}
              setAddCart={setAddCart}
              addCart={addCart}
            />
          )}
        </div>
        <div class="grid-item">
          {ProductShowed[(1 % 9) + 10 * pageId] && (
            <ProductCell
              product={ProductShowed[(1 % 9) + 10 * pageId]}
              onClick1={() => {}}
              onClick2={() => {}}
              onClick3={() => {}}
              setSelectedId={setSelectedId}
              index={(1 % 9) + 10 * pageId}
              setEdit={setEdit}
              setEditId={setEditId}
              adminLogined={adminLogined}
              setCart={setCart}
              cart={cart}
              buyQuant={buyQuant}
              setBuyQuant={setBuyQuant}
              setAddCart={setAddCart}
              addCart={addCart}
            />
          )}
        </div>
        <div class="grid-item">
          {ProductShowed[(2 % 9) + 10 * pageId] && (
            <ProductCell
              product={ProductShowed[(2 % 9) + 10 * pageId]}
              onClick1={() => {}}
              onClick2={() => {}}
              onClick3={() => {}}
              setSelectedId={setSelectedId}
              index={(2 % 9) + 10 * pageId}
              setEdit={setEdit}
              setEditId={setEditId}
              adminLogined={adminLogined}
              setCart={setCart}
              cart={cart}
              buyQuant={buyQuant}
              setBuyQuant={setBuyQuant}
              setAddCart={setAddCart}
              addCart={addCart}
            />
          )}
        </div>
        <div class="grid-item">
          {ProductShowed[(3 % 9) + 10 * pageId] && (
            <ProductCell
              product={ProductShowed[(3 % 9) + 10 * pageId]}
              onClick1={() => {}}
              onClick2={() => {}}
              onClick3={() => {}}
              setSelectedId={setSelectedId}
              index={(3 % 9) + 10 * pageId}
              setEdit={setEdit}
              setEditId={setEditId}
              adminLogined={adminLogined}
              setCart={setCart}
              cart={cart}
              buyQuant={buyQuant}
              setBuyQuant={setBuyQuant}
              setAddCart={setAddCart}
              addCart={addCart}
            />
          )}
        </div>
        <div class="grid-item">
          {ProductShowed[(4 % 9) + 10 * pageId] && (
            <ProductCell
              product={ProductShowed[(4 % 9) + 10 * pageId]}
              onClick1={() => {}}
              onClick2={() => {}}
              onClick3={() => {}}
              setSelectedId={setSelectedId}
              index={(4 % 9) + 10 * pageId}
              setEdit={setEdit}
              setEditId={setEditId}
              adminLogined={adminLogined}
              setCart={setCart}
              cart={cart}
              buyQuant={buyQuant}
              setBuyQuant={setBuyQuant}
              setAddCart={setAddCart}
              addCart={addCart}
            />
          )}
        </div>
        <div class="grid-item">
          {ProductShowed[(5 % 9) + 10 * pageId] && (
            <ProductCell
              product={ProductShowed[(5 % 9) + 10 * pageId]}
              onClick1={() => {}}
              onClick2={() => {}}
              onClick3={() => {}}
              setSelectedId={setSelectedId}
              index={(5 % 9) + 10 * pageId}
              setEdit={setEdit}
              setEditId={setEditId}
              adminLogined={adminLogined}
              setCart={setCart}
              cart={cart}
              buyQuant={buyQuant}
              setBuyQuant={setBuyQuant}
              setAddCart={setAddCart}
              addCart={addCart}
            />
          )}
        </div>
        <div class="grid-item">
          {ProductShowed[(6 % 9) + 10 * pageId] && (
            <ProductCell
              product={ProductShowed[(6 % 9) + 10 * pageId]}
              onClick1={() => {}}
              onClick2={() => {}}
              onClick3={() => {}}
              setSelectedId={setSelectedId}
              index={(6 % 9) + 10 * pageId}
              setEdit={setEdit}
              setEditId={setEditId}
              adminLogined={adminLogined}
              setCart={setCart}
              cart={cart}
              buyQuant={buyQuant}
              setBuyQuant={setBuyQuant}
              setAddCart={setAddCart}
              addCart={addCart}
            />
          )}
        </div>
        <div class="grid-item">
          {ProductShowed[(7 % 9) + 10 * pageId] && (
            <ProductCell
              product={ProductShowed[(7 % 9) + 10 * pageId]}
              onClick1={() => {}}
              onClick2={() => {}}
              onClick3={() => {}}
              setSelectedId={setSelectedId}
              index={(7 % 9) + 10 * pageId}
              setEdit={setEdit}
              setEditId={setEditId}
              adminLogined={adminLogined}
              setCart={setCart}
              cart={cart}
              buyQuant={buyQuant}
              setBuyQuant={setBuyQuant}
              setAddCart={setAddCart}
              addCart={addCart}
            />
          )}
        </div>
        <div class="grid-item">
          {ProductShowed[(8 % 9) + 10 * pageId] && (
            <ProductCell
              product={ProductShowed[(8 % 9) + 10 * pageId]}
              onClick1={() => {}}
              onClick2={() => {}}
              onClick3={() => {}}
              setSelectedId={setSelectedId}
              index={(8 % 9) + 10 * pageId}
              setEdit={setEdit}
              setEditId={setEditId}
              adminLogined={adminLogined}
              setCart={setCart}
              cart={cart}
              buyQuant={buyQuant}
              setBuyQuant={setBuyQuant}
              setAddCart={setAddCart}
              addCart={addCart}
            />
          )}
        </div>
        <div class="grid-item">
          {ProductShowed[9 + 10 * pageId] && (
            <ProductCell
              product={ProductShowed[9 + 10 * pageId]}
              onClick1={() => {}}
              onClick2={() => {}}
              onClick3={() => {}}
              setSelectedId={setSelectedId}
              index={9 + 10 * pageId}
              setEdit={setEdit}
              setEditId={setEditId}
              adminLogined={adminLogined}
              setCart={setCart}
              cart={cart}
              buyQuant={buyQuant}
              setBuyQuant={setBuyQuant}
              setAddCart={setAddCart}
              addCart={addCart}
            />
          )}
        </div>
      </div>
      <div className="homepage-page">
        <div class="page-container">
          <button class="page-item" onClick={switchPageDesc}>{`<<`}</button>
          <button class="page-item" onClick={() => setPageId(startPageId - 1)}>
            {startPageId}
          </button>
          <button class="page-item" onClick={() => setPageId(startPageId)}>
            {startPageId + 1}
          </button>
          <button class="page-item" onClick={() => setPageId(startPageId + 1)}>
            {startPageId + 2}
          </button>
          <button class="page-item" onClick={() => setPageId(startPageId + 2)}>
            {startPageId + 3}
          </button>
          <button class="page-item" onClick={() => setPageId(startPageId + 3)}>
            {startPageId + 4}
          </button>
          <button class="page-item" onClick={switchPageAesc}>{`>>`}</button>
        </div>
      </div>
    </>
  );
};
export default HomePage;
