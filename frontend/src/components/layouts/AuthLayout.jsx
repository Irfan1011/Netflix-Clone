import { Outlet, Link } from "react-router";

import Netflix from "../../assets/netflix.png";
import "../../styles/css/classes/UI/auth-nav.css";
import "../../styles/css/classes/pages/app.css";

const AuthLayout = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <img src={Netflix} alt="Netflix Logo" className="brand" />
        </Link>
      </nav>
      <section className="auth">
        <Outlet />
      </section>
    </>
  );
};

export default AuthLayout;
