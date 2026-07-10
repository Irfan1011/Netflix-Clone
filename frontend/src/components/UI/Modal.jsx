import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import "../../styles/css/classes/UI/modal.css";

const Modal = ({ children, open, onClose, styles }) => {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${styles}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
};

export default Modal;
