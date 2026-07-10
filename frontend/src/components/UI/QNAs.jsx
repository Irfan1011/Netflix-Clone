import { useState } from "react";

import QNA from "./QNA.jsx";
import { qna } from "../../util/dummy.js";

function QNAs() {
  const [answerVisible, setAnswerVisible] = useState("");

  return (
    <>
      {qna &&
        qna.map((item) => {
          return (
            <QNA
              key={item.id}
              question={item.question}
              answer={item.answer}
              onSetAnswer={setAnswerVisible}
              answerVisibility={answerVisible}
            />
          );
        })}
    </>
  );
}

export default QNAs;
