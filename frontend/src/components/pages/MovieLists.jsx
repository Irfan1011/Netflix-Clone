import { useState } from "react";
import MovieList from "./MovieList.jsx";
import Button from "../UI/Button.jsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "../../styles/css/classes/pages/movie-lists.css";

const MovieLists = ({ movies }) => {
  const [cssClass, setCssClass] = useState("move--left");
  const displayedMovie = movies.slice(0, 10);

  const handleClickPaginate = (val) => {
    if (val === "left") setCssClass("move--left");
    else setCssClass("move--right");
  };

  return (
    <ul className={`movies ${cssClass}`}>
      {displayedMovie.length > 0 &&
        displayedMovie.map((item, index) => {
          return (
            <MovieList
              key={item.id}
              id={item.id}
              idx={index + 1}
              title={item.title}
              category={item.genre_ids}
              description={item.overview}
              imgPath={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            />
          );
        })}
      <Button
        type="button"
        className={`btn__page-left ${cssClass === "move--right" ? "btn--show" : "btn--hide"}`}
        onClick={() => handleClickPaginate("left")}
      >
        <FaChevronLeft />
      </Button>
      <Button
        type="button"
        className={`btn__page-right ${cssClass === "move--left" ? "btn--show" : "btn--hide"}`}
        onClick={() => handleClickPaginate("right")}
      >
        <FaChevronRight />
      </Button>
    </ul>
  );
};

export default MovieLists;
