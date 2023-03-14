import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { CELLPRODUCT } from "../../content/cellproduct";
import AddProduct from "../addproduct";
import "./index.css";
const ProductCell = ({
  product,
  setSelectedId,
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
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const updateBuyItem = (quant = 0) => {
    const buyItem = {
      Name: product.Name,
      Price: product.Price,
      Link: product.Link,
      BuyQuantity: quant,
    };

    setCart([...cart, buyItem]);

    //console.log(cart);
  };
  const handleAddCart = () => {
    setAddCart([...addCart.slice(0, index), true, ...addCart.slice(index + 1)]);
    //console.log(addCart);
    for (var i = 0; i < buyQuant.length; i++) {
      if (buyQuant[i].Name === product.Name) {
        break;
      }
    }
    if (i === buyQuant.length) {
      const newItem = {
        Name: product.Name,
        Buy: 1,
      };
      setBuyQuant([...buyQuant, newItem]);
      updateBuyItem(1);
      console.log(buyQuant);
    }
  };
  const handleShowDetail = () => {
    setSelectedId(index);
  };
  const handleShowEdit = () => {
    setEdit(true);
    setEditId(index);
  };

  return (
    <>
      <div className="cell-container">
        <div
          className={
            isMobile ? "cell-img1" : index % 10 > 4 ? "cell-img2" : "cell-img1"
          }
        >
          <NavLink to="/photo">
            <img
              alt="not fount"
              width={"240px"}
              height={"150px"}
              src={product.Link}
            />
          </NavLink>
        </div>
        <div className="cell-content">
          <NavLink to={`/productDetail/${index}`}>
            <label className="cell-product-name" onClick={handleShowDetail}>
              {product.Name}
            </label>
          </NavLink>
          <label className="cell-product-price">${product.Price}</label>
        </div>

        <div
          className={
            isMobile
              ? "cell-button1"
              : index % 10 > 4
              ? "cell-button2"
              : "cell-button1"
          }
        >
          {addCart[index] ? (
            <AddProduct
              product={product}
              setCart={setCart}
              cart={cart}
              productId={index}
              addCart={addCart}
              setAddCart={setAddCart}
              buyQuant={buyQuant}
              setBuyQuant={setBuyQuant}
            />
          ) : (
            <button className="button1" onClick={handleAddCart}>
              {CELLPRODUCT.BUTTON1}
            </button>
          )}
          {adminLogined && (
            <NavLink
              to={`/editproduct/${index}`}
              className="homepage-link-edit"
            >
              <button className="button2" onClick={handleShowEdit}>
                {CELLPRODUCT.BUTTON2}
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};
export default ProductCell;
