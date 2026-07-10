import "../../styles/css/classes/UI/reason.css";

const Reason = ({ why, more }) => {
  return (
    <article className="reason">
      <h2>{why}</h2>
      <p>{more}</p>
    </article>
  );
};

export default Reason;
