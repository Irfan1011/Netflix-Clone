const List = ({ link, children }) => {
  return (
    <li>
      <a href={link}>{children}</a>
    </li>
  );
};

export default List;
