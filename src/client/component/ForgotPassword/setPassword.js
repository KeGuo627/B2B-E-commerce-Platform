import validator from "validator";
import React from "react";
import { SETPW } from "../../content/forgotpassword/index";
import { useState } from "react";
import "./index.css";

const ForgotPassword = ({ setShowConfirm, setShowPW }) => {
  const [emailValue, setEmailValue] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [error, setError] = useState(false);

  const validateEmail = (email) => {
    return email && validator.isEmail(email);
  };

  const handleShowConfirm = () => {
    if (validateEmail(emailValue)) {
      setError(false);
      setErrorEmail("");
      console.log(`email: ${emailValue}`);
      setShowConfirm(true);
      setShowPW(false);
    } else {
      setError(true);
      setErrorEmail("Invalid Email Input!");
    }
  };

  return (
    <>
      <div className="forgot-container">
        <h5 className="forgot-subtitle">{SETPW.SUBTITLE}</h5>
        <div className="Email">
          <label>{SETPW.EMAIL}</label>
          <input
            type="email"
            className={error ? "username-invalid" : "username-input"}
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          {error && <div className="input-feedback">{errorEmail}</div>}
        </div>
        <div className="submit">
          <button
            type="submit"
            className="submit-btn"
            onClick={handleShowConfirm}
          >
            {SETPW.BUTTON}
          </button>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
