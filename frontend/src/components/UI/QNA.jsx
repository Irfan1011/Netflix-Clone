import { FaPlus } from "react-icons/fa";

import Button from "./Button";

import "../../styles/css/classes/UI/qna.css";

const QNA = ({ question, answer, onSetAnswer, answerVisibility }) => {
  const handleQuestion = () => {
    onSetAnswer((prev) => (prev === "" || prev !== question ? question : ""));
  };

  return (
    <div className="qna">
      <Button onClick={handleQuestion}>
        <p>{question}</p>
        <FaPlus
          className={answerVisibility === question ? "rotate-icon" : ""}
        />
      </Button>
      {answerVisibility === question && <p>{answer}</p>}
    </div>
  );
};

export default QNA;
