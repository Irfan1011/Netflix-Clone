import { useRef } from "react";
import { useNavigate } from "react-router";

import Button from "./Button.jsx";

import "../../styles/css/classes/UI/EmailMainInput.css";

const EmailMainInput = () => {
  const emailRef = useRef("");
  const navigate = useNavigate();

  const handleClickStart = () => {
    const email = emailRef.current.value.trim();

    navigate("/register", { state: email });
  };

  return (
    <div className="main__input">
      <p>
        Siap menonton? Masukkan email untuk membuat atau memulai lagi
        keanggotaanmu.
      </p>
      <form onSubmit={(e) => e.preventDefault()} className="email__form">
        <div className="form-control">
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="email"
            placeholder=""
            ref={emailRef}
          />
          <label htmlFor="email">Alamat Email</label>
        </div>
        <Button type={"button"} styles={"main-btn"} onClick={handleClickStart}>
          Mulai
        </Button>
      </form>
    </div>
  );
};

export default EmailMainInput;
