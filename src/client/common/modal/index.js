import React from "react";
import "antd/dist/antd.min.css";
import { ResizableBox } from "react-resizable";
import { useMediaQuery } from "react-responsive";
import { Modal } from "antd";
import CloseButton from "react-bootstrap/CloseButton";
import "./index.css";
const MyModal = ({
  titleText,
  children,
  openModal,
  onCancel,
  height = 300,
  mobileH = 350,
  mobileW = 250,
  isShoppingCart,
}) => {
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 800px)" });

  return (
    <Modal
      className="modal-header no-border"
      width="min-content"
      height={600}
      closeIcon={<CloseButton />}
      title={
        <div className={isShoppingCart ? "modal-title2" : "modal-title"}>
          {titleText}
        </div>
      }
      visible={openModal}
      footer={null}
      onCancel={onCancel}
    >
      <ResizableBox
        width={isMobileOrTablet ? mobileW : 460}
        height={isMobileOrTablet ? mobileH : height}
        minConstraints={[100, 100]}
        maxConstraints={[500, 500]}
      >
        {children}
      </ResizableBox>
    </Modal>
  );
};
export default MyModal;
