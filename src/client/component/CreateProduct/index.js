import ProductInfo from "../../common/product";
import { PRODUCTINFO } from "../../content/productinfo";
import "./index.css";
const CreateProduct = ({ setProduct, setAddCart, addCart }) => {
  const title = PRODUCTINFO.CREATETITLE;
  const button = PRODUCTINFO.CREATEBUTTON;
  const editInfo = { edit: false };
  return (
    <>
      <ProductInfo
        title={title}
        buttonName={button}
        className="createproduct"
        setProduct={setProduct}
        editInfo={editInfo}
        setAddCart={setAddCart}
        addCart={addCart}
      />
    </>
  );
};
export default CreateProduct;
