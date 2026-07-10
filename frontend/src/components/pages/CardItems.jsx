import { useEffect, useRef } from "react";

import Card from "../UI/Card.jsx";

import "../../styles/css/classes/pages/card-items.css";

const CardItems = ({ title, movies }) => {
  const itemsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    itemsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    itemsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="items-wrapper">
      <h2 className="items__category">{title}</h2>
      <ul className="items" ref={itemsRef}>
        {movies.length > 0 &&
          movies.map((r) => (
            <li key={r.id} className="item">
              <Card
                id={r.id}
                title={r.title}
                imgPath={`https://image.tmdb.org/t/p/w500/${r.poster_path}`}
                published_date={r.release_date}
                desciption={r.overview}
                totalVote={r.vote_average}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CardItems;
