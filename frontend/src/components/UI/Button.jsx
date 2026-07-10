import "../../styles/css/classes/UI/btn.css";

const Button = ({ children, type, styles, ...props }) => {
  const css = styles ? `default-btn ${styles}` : "default-btn";

  return (
    <button type={type} className={css} {...props}>
      {children}
    </button>
  );
};

export default Button;
