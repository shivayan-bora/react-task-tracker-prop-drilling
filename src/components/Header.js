import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ title, showAddTask, toggleAddTask }) => {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          color={`${showAddTask ? "red" : "green"}`}
          title={`${showAddTask ? "Close" : "Add"}`}
          onClick={toggleAddTask}
        />
      )}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  title: "Task Tracker",
};

export default Header;
