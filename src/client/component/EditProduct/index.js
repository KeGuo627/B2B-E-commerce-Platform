import ProductInfo from "../../common/product";
import { PRODUCTINFO } from "../../content/productinfo";
import "./index.css";
const EditProduct = ({ edit, setEdit, product, editId, setProduct }) => {
  const title = PRODUCTINFO.EDITTITLE;
  const button = PRODUCTINFO.SAVEBUTTON;
  const handlehideEdit = () => {
    setEdit(false);
  };
  const editInfo = {
    edit: edit,
    product: product,
    index: editId,
  };
  console.log(editInfo);
  return (
    <>
      <ProductInfo
        title={title}
        buttonName={button}
        className="saveproduct"
        onClick={handlehideEdit}
        setProduct={setProduct}
        editInfo={editInfo}
        product={product}
      />
    </>
  );
};
export default EditProduct;
