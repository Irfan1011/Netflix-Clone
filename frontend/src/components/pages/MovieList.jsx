import { memo, useState } from "react";

import Modal from "../UI/Modal.jsx";
import Button from "../UI/Button.jsx";
import { getFetchGenre } from "../../util/https.js";

import "../../styles/css/classes/pages/movie-lists.css";

const MovieList = memo(({ id, idx, imgPath, title, description, category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const genre = getFetchGenre();

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <li key={id} className="movie">
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={handleModal}
          styles="modal--front-page"
        >
          <div className="modal__banner">
            <img src={imgPath} alt={title} />
            <h2>{title}</h2>
            <Button type="btn" styles="btn--round" onClick={handleModal}>
              X
            </Button>
          </div>
          <div className="modal__info--col">
            <ul className="info__cat">
              {category &&
                category.map((item, index) => {
                  const res = genre.find((i) => i.id == item);
                  return <li key={index}>{res.name}</li>;
                })}
            </ul>
            <p>{description}</p>
            <Button type="buton" styles="main-btn">
              Mulai
            </Button>
          </div>
        </Modal>
      )}
      <div className="movie__card" onClick={handleModal}>
        <p>{idx}</p>
        <img src={imgPath} alt={title} />
      </div>
    </li>
  );
});

export default MovieList;
