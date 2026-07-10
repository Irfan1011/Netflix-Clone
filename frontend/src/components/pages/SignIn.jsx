import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useInput } from "../../hooks/useInput.js";
import { postLogin } from "../../util/https.js";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";

import "../../styles/css/classes/pages/auth.css";

const SignIn = () => {
  const [beError, setBeError] = useState();
  const navigate = useNavigate();

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

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const fd = new FormData(event.target);
      const data = Object.fromEntries(fd.entries());

      const login = await postLogin(data);
      if (login !== "Login Success") {
        setBeError(login);
        return;
      }

      event.target.reset();
      navigate("/home");
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <>
      <form className="auth-card" onSubmit={handleSubmitForm}>
        <h1 className="title">Sign In</h1>
        <Input
          type="text"
          name="email"
          placeholder="Email or Mobile Number"
          invalidInputMsg="Email or Mobile Number is Invalid"
          onBlur={handleEmailBlur}
          onChange={handleUserEmail}
          value={emailValue}
          error={
            (emailHasError && "Please enter a valid email") ||
            (beError && beError[0].path === "email" && beError[0].msg)
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
        <Button type="submit" styles="main-btn btn--auth">
          Sign In
        </Button>

        <div className="auth-card__remember">
          <div className="remember__left">
            <input type="checkbox" defaultChecked />
            <label htmlFor="checkbox">Remember Me</label>
          </div>
          <div className="remember__right">
            <a href="">Forget Password?</a>
          </div>
        </div>
        <p className="auth-link">
          New to Netflix?
          <Link to="/register">
            <Button type="button" styles="btn--link">
              Sign Up
            </Button>
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignIn;
