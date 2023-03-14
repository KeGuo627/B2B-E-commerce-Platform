import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { ajaxConfigHelper } from "../../helper/index";
import { PRODUCTINFO } from "../../content/productinfo";
import "../../App";
import "./index.css";
const ProductInfo = ({
  title,
  buttonName,
  setProduct,
  editInfo,
  setAddCart,
  addCart,
  product,
}) => {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(false);
  const [urlInput, setURLInput] = useState("");

  useEffect(() => {
    if (editInfo.edit) {
      setNameInput(editInfo.product[editInfo.index].Name);
      setDescriptionInput(editInfo.product[editInfo.index].Description);
      setCategoryInput(editInfo.product[editInfo.index].Category);
      setPriceInput(editInfo.product[editInfo.index].Price);
      setQuantityInput(editInfo.product[editInfo.index].Quantity);
      setURLInput(editInfo.product[editInfo.index].Link);
      setSelectedImage(false);
    }
  }, []);
  const retrieveurl = () => {
    setSelectedImage(true);
  };

  //addProductInfo
  const addProductInfo = async (newProductInfo) => {
    try {
      const response = await fetch(
        "/addProductInfo",
        ajaxConfigHelper(newProductInfo)
      );
      const result = await response.json();
      setProduct((prev) => {
        return [...prev, newProductInfo];
      });
      setAddCart((prev) => {
        return [...prev, false];
      });
      console.log(addCart);
    } catch (error) {
      console.log(error);
    }
  };

  //modProductInfo
  const modProductInfo = async ({ Name, updatedProduct }) => {
    try {
      const response = await fetch(
        "/modProductInfo",
        ajaxConfigHelper({ Name, updatedProduct }, "PUT")
      );
      const result = await response.json();
      console.log(result);
      if (result.status === 200) {
        setProduct((prev) => {
          return prev.map((item) => {
            if (item.Name === Name) {
              return {
                ...item,
                Name: nameInput,
                Description: descriptionInput,
                Category: categoryInput,
                Price: priceInput,
                Quantity: quantityInput,
                Link: urlInput,
              };
            } else {
              return item;
            }
          });
        });
      } else if (result.status === 400) {
        alert("The product doesn't exist or edit doesn't successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProduct = () => {
    const newItem = {
      Name: nameInput,
      Description: descriptionInput,
      Category: categoryInput,
      Price: priceInput,
      Quantity: quantityInput,
      Link: urlInput,
    };
    if (editInfo.edit) {
      const Name = product[editInfo.index].Name;
      const updatedProduct = newItem;
      modProductInfo({ Name, updatedProduct });
    } else {
      addProductInfo(newItem);
    }
    //clean the input
    setNameInput("");
    setDescriptionInput("");
    setCategoryInput("Category1");
    setPriceInput("");
    setQuantityInput("");
    setURLInput("");
    setSelectedImage(false);
  };
  return (
    <>
      <div className="productinfo-container">
        <div className="productinfo-title">
          <label className="productinfo-header">{title}</label>
        </div>
        <div className="productinfo-form">
          <div className="content1">
            <label className="content-label">{PRODUCTINFO.NAME}</label>
            <input
              className="content-input1"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
          <div className="content2">
            <label className="content-label">{PRODUCTINFO.DESCRIPTION}</label>
            <textarea
              className="content-input1"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
          </div>
          <div className="content3">
            <div className="content3-1">
              <label className="content-label">{PRODUCTINFO.CATEGORY}</label>
              <select
                className="content-dropdown"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
              >
                <option value={PRODUCTINFO.DROPDOWN[0]}>
                  {PRODUCTINFO.DROPDOWN[0]}
                </option>
                <option value={PRODUCTINFO.DROPDOWN[1]}>
                  {PRODUCTINFO.DROPDOWN[1]}
                </option>
                <option value={PRODUCTINFO.DROPDOWN[2]}>
                  {PRODUCTINFO.DROPDOWN[2]}
                </option>
                <option value={PRODUCTINFO.DROPDOWN[3]}>
                  {PRODUCTINFO.DROPDOWN[3]}
                </option>
                <option value={PRODUCTINFO.DROPDOWN[4]}>
                  {PRODUCTINFO.DROPDOWN[4]}
                </option>
              </select>
            </div>
            <div className="content3-2">
              <label className="content-label">{PRODUCTINFO.PRICE}</label>
              <input
                className="content-input2"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
              />
            </div>
          </div>
          <div className="content4">
            <div className="content4-1">
              <label className="content-label">{PRODUCTINFO.QUANTITY}</label>
              <input
                className="content-input3"
                value={quantityInput}
                onChange={(e) => setQuantityInput(e.target.value)}
              />
            </div>
            <div className="content4-2">
              <label className="content-label">{PRODUCTINFO.LINK}</label>
              <input
                type="url"
                name="myImage"
                value={urlInput}
                className="content-input4"
                placeholder="http://"
                onChange={(e) => setURLInput(e.target.value)}
              />
            </div>
            <div className="content4-3">
              <button className="content4-3-button" onClick={retrieveurl}>
                {PRODUCTINFO.BUTTON}
              </button>
            </div>
          </div>
          {selectedImage ? (
            <div className="content5">
              <img
                alt="not fount"
                width={"250px"}
                height={"150px"}
                src={urlInput}
              />
            </div>
          ) : (
            <div className="content5">
              <i className="content5-i">
                <HiOutlinePhotograph />
              </i>
              <label className="content5-preview">{PRODUCTINFO.PREVIEW}</label>
            </div>
          )}

          <div className="content6">
            <NavLink to="/">
              <button className="content6-button" onClick={handleProduct}>
                {buttonName}
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductInfo;
