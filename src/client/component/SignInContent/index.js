import validator from "validator";
import React, { useState } from "react";
import { ajaxConfigHelper } from "../../helper/index";
import { SIGNIN } from "../../content/signin/index";
import { SIGNUP } from "../../content/signup/index";
import "../../App.js";
import "./index.css";

const SignInContent = ({
  setSignUpModal,
  setShowPW,
  setOpenModal,
  setLogin,
  setAdminLogined,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  const [pwValues, setPWValues] = useState({
    password: "",
    showPassword: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    errorEmail: "",
    errorPassword: "",
  });
  const [error, setError] = useState({
    emailIsError: false,
    passwordIsError: false,
  });

  const handleShowPassword = () => {
    setIsShow(!isShow);
    setPWValues({ ...pwValues, showPassword: !pwValues.showPassword });
  };

  const handlePasswordChange = (prop) => (event) => {
    setPWValues({ ...pwValues, [prop]: event.target.value });
  };
  const validateEmail = (email) => {
    return email && validator.isEmail(email);
  };
  const validatePassword = (password) => {
    return password;
  };
  //modifyUserInfo
  const modInfo = async (email, password) => {
    try {
      const response = await fetch(
        "/modUserInfo",
        ajaxConfigHelper({ email: email, password: password }, "PUT")
      );
      const result = await response.json();
      if (result.status == 400) {
        setError({ emailIsError: true, passwordIsError: true });
        setErrorMsg({
          errorEmail: "Invalid Email Input!",
          errorPassword: "Invalid Password Input!",
        });
      } else {
        console.log("Verify Successfully");
        setErrorMsg({ errorEmail: "", errorPassword: "" });
        setError({ emailIsError: false, passwordIsError: false });
        if (email == "admin@gmail.com" && password == "Admin@001") {
          console.log("Admin logined in!");
          setAdminLogined(true);
        } else {
          setAdminLogined(false);
        }
        setOpenModal(false);
        setLogin(true);

        localStorage.setItem("accessToken", result.accessToken);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = () => {
    if (validatePassword(pwValues.password) && validateEmail(emailValue)) {
      console.log(`Email: ${emailValue}, Password: ${pwValues.password}`);
      const info = { email: emailValue, password: pwValues.password };
      modInfo(info.email, info.password);
    } else if (
      !validateEmail(emailValue) &&
      validatePassword(pwValues.password)
    ) {
      setError({ emailIsError: true, passwordIsError: false });
      setErrorMsg({ errorEmail: "Invalid Email Input!", errorPassword: "" });
    } else if (
      validateEmail(emailValue) &&
      !validatePassword(pwValues.password)
    ) {
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

  const handleShowSignUp = () => {
    setSignUpModal(true);
    console.log("show sign up");
  };

  const handleShowPW = () => {
    setShowPW(true);
    console.log("show forgot password");
  };
  return (
    <>
      <div className="body">
        <div className="usename">
          <label>{SIGNIN.EMAIL}</label>
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
          <label>{SIGNIN.PASSWORD}</label>
          <input
            type={pwValues.showPassword ? "text" : "password"}
            className={
              error.passwordIsError ? "password-invalid" : "password-input"
            }
            value={pwValues.password}
            onChange={handlePasswordChange("password")}
          />
          <a href="#" className="show" onClick={handleShowPassword}>
            {isShow ? "Hide" : "Show"}
          </a>
          {errorMsg.errorPassword && (
            <div className="input-feedback">{errorMsg.errorPassword}</div>
          )}
        </div>
        <div className="submit">
          <button type="submit" className="submit-btn" onClick={handleSignIn}>
            {SIGNIN.BUTTON}
          </button>
        </div>
      </div>
      <p class="leftlink">
        {SIGNIN.LEFTLINK}
        <a href="#" onClick={handleShowSignUp}>
          {SIGNUP.BUTTON}
        </a>
      </p>
      <p class="rightlink">
        <a href="#" onClick={handleShowPW}>
          {SIGNIN.RIGHTLINK}
        </a>
      </p>
    </>
  );
};

export default SignInContent;
