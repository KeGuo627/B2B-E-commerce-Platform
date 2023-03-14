import { NavLink } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
import "./index.css";
const Error = () => {
  return (
    <div className="error-container">
      <FaExclamationCircle color="purple" className="error-icon" />
      <h2 className="error-h2">Oops, something went wrong!</h2>
      <NavLink to="/">
        <button className="error-button">Go Home</button>
      </NavLink>
    </div>
  );
};
export default Error;
