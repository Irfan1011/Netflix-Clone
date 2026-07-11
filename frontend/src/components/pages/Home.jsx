import { useLoaderData, redirect } from "react-router";
import { FaPlay, FaInfoCircle } from "react-icons/fa";

import { getFetchedMovies } from "../../util/https.js";
import Navbar from "../UI/Navbar.jsx";
import Footer from "../UI/Footer.jsx";
import CardItems from "./CardItems.jsx";
import Button from "../UI/Button.jsx";

import "../../styles/css/classes/pages/home.css";

const Home = () => {
  const loadData = useLoaderData(null);

  return (
    <>
      <Navbar userData={loadData.data} />

      <section className="home">
        <div className="hero">
          <div className="hero__banner"></div>
          <div className="hero__details">
            <div className="hero__detail">
              <div className="hero__title"></div>
              <p className="hero__caption">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit repellendus illum consequatur voluptas beatae at
                modi, aliquid laudantium eum ea.
              </p>
              <div className="hero__btns">
                <Button>
                  <FaPlay /> Play
                </Button>
                <Button>
                  <FaInfoCircle /> More Info
                </Button>
              </div>
            </div>
            <CardItems
              title="Popular"
              movies={
                getFetchedMovies("/3/movie/popular?language=en-US&page=1")
                  .movies
              }
            />
          </div>
        </div>
        <div className="home__lists">
          <CardItems
            title="Now Playing"
            movies={getFetchedMovies("/3/movie/now_playing").movies}
          />
          <CardItems
            title="Top Rated"
            movies={getFetchedMovies("/3/movie/top_rated").movies}
          />
          <CardItems
            title="Upcoming"
            movies={getFetchedMovies("/3/movie/upcoming").movies}
          />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;

export const isAuthLoader = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/isAuth`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw redirect("/");
  }

  const resData = await response.json();

  return resData;
};
