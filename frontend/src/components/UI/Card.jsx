import { useState } from "react";
import { IoMdArrowBack, IoMdStar } from "react-icons/io";
import { getMovieYoutubeKey } from "../../util/https.js";

import Modal from "./Modal.jsx";
import Button from "./Button.jsx";
import "../../styles/css/classes/UI/card.css";

const Card = ({
  id,
  imgPath,
  title,
  desciption,
  published_date,
  totalVote,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const key = getMovieYoutubeKey(id);

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={handleModal}>
          <div className="modal__info">
            <Button type="button" className="btn--round" onClick={handleModal}>
              <IoMdArrowBack />
            </Button>
            <div className="modal__desc">
              <p className="modal__date">{published_date}</p>
              <p className="modal__title">{title}</p>
              <p className="modal__vote">
                <IoMdStar />
                {totalVote.toFixed(1)}
              </p>
            </div>
          </div>
          <iframe
            src={`https://www.youtube.com/embed/${key}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Modal>
      )}
      <div className="card" onClick={handleModal}>
        <img src={imgPath} alt={title} className="card__img" />
        <h2>{title}</h2>
        <p>{desciption}</p>
      </div>
    </>
  );
};

export default Card;
