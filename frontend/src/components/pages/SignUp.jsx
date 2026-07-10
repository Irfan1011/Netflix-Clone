import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";

import { useInput } from "../../hooks/useInput.js";
import { postRegister } from "../../util/https.js";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";

import "../../styles/css/classes/pages/auth.css";

const SignUp = ({ onSelectedPath }) => {
  const [beError, setBeError] = useState();
  const navigate = useNavigate();
  const locations = useLocation();

  const {
    value: emailValue,
    handleInputBlur: handleEmailBlur,
    handleUserInput: handleUserEmail,
    hasError: emailHasError,
  } = useInput(
    "",
    (value) =>
      !(value.includes("@") && value.includes(".com")) || value.length < 1,
  );

  const {
    value: passwordValue,
    handleInputBlur: handlePasswordBlur,
    handleUserInput: handleUserPassword,
    hasError: passwordHasError,
  } = useInput("", (value) => value.length < 6);

  const {
    value: confirmPassword,
    handleInputBlur: handleConfirmPasswordBlur,
    handleUserInput: handleUserConfirmPassword,
    hasError: confirmPasswordHasError,
  } = useInput("", (value) => value.length < 6 || value !== passwordValue);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const fd = new FormData(event.target);
      const data = Object.fromEntries(fd.entries());

      const register = await postRegister(data);
      if (register !== "Register Success") {
        setBeError(register);
        return;
      }

      event.target.reset();
      navigate("../login");
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <>
      <form className="auth-card" onSubmit={handleSubmitForm}>
        <h1 className="title">Sign Up</h1>
        <Input
          type="text"
          name="email"
          placeholder="Email or Mobile Number"
          onBlur={handleEmailBlur}
          onChange={handleUserEmail}
          value={locations.state || emailValue}
          error={
            (emailHasError && "Please enter a valid email") ||
            (beError &&
              beError[0].value === emailValue &&
              beError[0].path === "email" &&
              beError[0].msg)
          }
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onBlur={handlePasswordBlur}
          onChange={handleUserPassword}
          value={passwordValue}
          error={
            (passwordHasError && "Password has minimum 6 length") ||
            (beError && beError[0].path == "password" && beError[0].msg)
          }
        />
        <Input
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
          onBlur={handleConfirmPasswordBlur}
          onChange={handleUserConfirmPassword}
          value={confirmPassword}
          error={
            (confirmPasswordHasError && "Password doesn't match") ||
            (beError &&
              beError[0].path === "confirm-password" &&
              beError[0].msg)
          }
        />
        <Button type="submit" styles="main-btn btn--auth">
          Sign Up
        </Button>

        <p className="auth-link">
          Already have an Account?
          <Link to="/login">
            <Button type="button" styles="btn--link" onClick={onSelectedPath}>
              Sign In
            </Button>
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;
