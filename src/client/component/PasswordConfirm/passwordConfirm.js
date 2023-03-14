import React from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { SETPW } from "../../content/forgotpassword";

import "./index.css";
const PasswordConfirmation = () => {
  return (
    <>
      <div className="container">
        <i className="icon">
          <MdOutlineMarkEmailRead color="purple" />
        </i>
        <p className="confirm">{SETPW.CONFIRMATION}</p>
      </div>
    </>
  );
};
export default PasswordConfirmation;
