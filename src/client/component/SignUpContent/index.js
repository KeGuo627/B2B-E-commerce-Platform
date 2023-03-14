import validator from "validator";
import React, { useState } from "react";
import { SIGNUP } from "../../content/signup/index";
import { ajaxConfigHelper } from "../../helper/index";
import { SIGNIN } from "../../content/signin/index";
import "./index.css";

const SignUpContent = ({ setSignUpModal }) => {
  const [emailValue, setEmailValue] = useState("");

  const [pwValues, setPWValues] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    errorEmail: "",
    errorPassword: "",
  });
  const [error, setError] = useState({
    emailIsError: false,
    passwordIsError: false,
  });

  //addUserInfo
  const addInfo = async (newInfo) => {
    try {
      const response = await fetch("/addUserInfo", ajaxConfigHelper(newInfo));
      const result = await response.json();
      if (result.status === 400) {
        setError({ emailIsError: true, passwordIsError: false });
        setErrorMsg({
          errorEmail: "Invalid Email Input!",
          errorPassword: "",
        });
      } else if (result.status === 200) {
        setErrorMsg({ errorEmail: "", errorPassword: "" });
        setError({ emailIsError: false, passwordIsError: false });
        console.log("create account successfully");
        setEmailValue("");
        setPWValues("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onsubmit = () => {
    const newInfo = {
      email: emailValue,
      password: pwValues,
      logined: false,
      cart: [],
      showAddCart: [false, false, false, false, false],
      buyQuant: [],
      discount: false,
    };
    addInfo(newInfo);
  };

  const validateEmail = (email) => {
    return email && validator.isEmail(email);
  };
  const validatePassword = (password) => {
    return (
      password &&
      validator.isStrongPassword(password, {
        minLength: 8,
        maxLength: 13,
        minUppercase: 1,
        minSymbols: 1,
      })
    );
  };

  const handleSignUp = () => {
    if (validatePassword(pwValues) && validateEmail(emailValue)) {
      console.log(`Email: ${emailValue}, Password: ${pwValues}`);
      onsubmit();
    } else if (!validateEmail(emailValue) && validatePassword(pwValues)) {
      setError({ emailIsError: true, passwordIsError: false });
      setErrorMsg({ errorEmail: "Invalid Email Input!", errorPassword: "" });
    } else if (validateEmail(emailValue) && !validatePassword(pwValues)) {
      setError({ emailIsError: false, passwordIsError: true });
      setErrorMsg({
        errorEmail: "",
        errorPassword: "Invalid Password Input!",
      });
    } else {
      setError({ emailIsError: true, passwordIsError: true });
      setErrorMsg({
        errorEmail: "Invalid Email Input!",
        errorPassword: "Invalid Password Input!",
      });
    }
  };

  const handleShowSignIn = () => {
    setSignUpModal(false);
    console.log("show sign in");
  };

  return (
    <>
      <div className="body">
        <div className="usename">
          <label>{SIGNUP.EMAIL}</label>
          <input
            type="email"
            className={
              error.emailIsError ? "username-invalid" : "username-input"
            }
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          {errorMsg.errorEmail && (
            <div className="input-feedback">{errorMsg.errorEmail}</div>
          )}
        </div>
        <div className="password">
          <label>{SIGNUP.PASSWORD}</label>
          <input
            type="text"
            className={
              error.passwordIsError ? "password-invalid" : "password-input"
            }
            value={pwValues}
            onChange={(e) => setPWValues(e.target.value)}
          />
          {errorMsg.errorPassword && (
            <div className="input-feedback">{errorMsg.errorPassword}</div>
          )}
        </div>
        <div className="submit">
          <button type="submit" className="submit-btn" onClick={handleSignUp}>
            {SIGNUP.BUTTON}
          </button>
        </div>
      </div>
      <p class="leftlink-2">
        {SIGNUP.LEFTLINK}
        <a href="#" onClick={handleShowSignIn}>
          {SIGNIN.BUTTON}
        </a>
      </p>
    </>
  );
};

export default SignUpContent;
