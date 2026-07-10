import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router";
import { FaSearch, FaBell, FaAlignJustify } from "react-icons/fa";

import { postLogout } from "../../util/https";
import Netflix from "../../assets/netflix.png";
import List from "./List";
import Button from "./Button";

import "../../styles/css/classes/UI/navbar.css";

const Navbar = ({ userData }) => {
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const navRef = useRef();
  const navMobileRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 50) {
        navRef.current.classList.add("nav--dark");
        navMobileRef.current.classList.add("nav--dark");
      } else {
        navRef.current.classList.remove("nav--dark");
        navMobileRef.current.classList.remove("nav--dark");
      }
    });
  }, []);

  const handleOpenMobileNavbar = () => {
    setIsMobileNavbarOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    const response = await postLogout();

    if (!response === "Logged Out") {
      console.log(response);
    }

    navigate("/");
  };

  return (
    <>
      <nav className="nav" ref={navRef}>
        <section className="nav__left">
          <Link to="/home">
            <img src={Netflix} alt="Netflix Logo" />
          </Link>
        </section>
        <section className="nav__menu">
          <ul>
            <List link="">Home</List>
            <List link="">TV Shows</List>
            <List link="">Movies</List>
            <List link="">New & Popular</List>
            <List link="">My List</List>
            <List link="">Browse by Language</List>
          </ul>
        </section>
        <section className="nav__right">
          <FaSearch />
          <p>{userData.email.split("@")[0]}</p>
          <FaBell />
          <div className="profile">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
              alt="Profile"
            />
            <Button className="btn--dropdown" onClick={handleSignOut}>
              Sign Out of Netflix
            </Button>
          </div>
        </section>
      </nav>
      {isMobileNavbarOpen && (
        <div className="backdrop" onClick={handleOpenMobileNavbar}></div>
      )}
      <nav
        className={`nav-mobile ${isMobileNavbarOpen ? "open" : null}`}
        ref={navMobileRef}
      >
        <section className="nav-mobile__left">
          {isMobileNavbarOpen && (
            <button onClick={handleOpenMobileNavbar}>X</button>
          )}
          <Link to="/home">
            <img src={Netflix} alt="Netflix Logo" />
          </Link>
        </section>
        {isMobileNavbarOpen && (
          <section className="nav-mobile__menu">
            <ul>
              <List link="">Home</List>
              <List link="">TV Shows</List>
              <List link="">Movies</List>
              <List link="">New & Popular</List>
              <List link="">My List</List>
              <List link="">Browse by Language</List>
            </ul>
          </section>
        )}
        {!isMobileNavbarOpen && (
          <section className="nav-mobile__right">
            <button onClick={handleOpenMobileNavbar}>
              <FaAlignJustify />
            </button>
          </section>
        )}
      </nav>
    </>
  );
};

export default Navbar;
