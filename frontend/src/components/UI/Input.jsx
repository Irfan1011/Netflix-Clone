import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "../../styles/css/classes/UI/input.css";

const Input = ({ type, name, placeholder, onBlur, onChange, value, error }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleIcon = () => {
    setIsShowPassword((prevIcon) => !prevIcon);
  };

  const inputCss = error ? "form-control__input--err" : "form-control__input";
  const formCss = error ? "form-control--err" : "form-control";

  return (
    <>
      <div className={formCss}>
        <input
          type={isShowPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          className={inputCss}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          required
        />
        {type === "password" && (
          <button
            type="button"
            className="form-control__btn"
            onClick={handleIcon}
          >
            {isShowPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
      {error && <p className="err">{error}</p>}
    </>
  );
};

export default Input;
