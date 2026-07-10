import { IoLanguage } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

import "../../styles/css/classes/UI/selectLanguage.css";

const SelectLanguage = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="language-dropdown">
      <IoLanguage className="language-icon" />
      <IoMdArrowDropdown className="arrow-icon" />
      <select name="language" id="language">
        <option value="Bahasa Indonesia">Bahasa Indonesia</option>
        <option value="English">English</option>
      </select>
    </form>
  );
};

export default SelectLanguage;
