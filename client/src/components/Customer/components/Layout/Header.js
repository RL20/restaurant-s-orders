import { Fragment } from "react";
import { useHistory } from "react-router";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import { userLogOut } from "../../api/Api";

const Header = (props) => {
  const history = useHistory();
  // const userString = localStorage.getItem("loggedUser");
  // const userObj = JSON.parse(userString);

  const logout = async () => {
    await userLogOut();
    // localStorage.removeItem("token");
    // localStorage.removeItem("loggedUser");
    props.handleLogout();
  };

  const adminNevigate = () => {
    history.push("/admin");
  };
  const btnStyle = {
    cursor: "pointer",
    font: "inherit",
    border: "none",
    backgroundColor: "#4d1601",
    color: "white",
    padding: "0.75rem 3rem",
    display: "flex",
    justifyContent: "space-around",
    alignitems: "center",
    borderRadius: "25px",
    fontweight: "bold",
  };
  return (
    <Fragment>
      <header className={classes.header}>
        <HeaderCartButton onClick={props.onShowCart} />
        <h1>שווארמה זוהר </h1>
        <button style={btnStyle} onClick={logout}>
          התנתק
        </button>
        {props.user?.isAdmin && (
          <button style={btnStyle} onClick={adminNevigate}>
            אדמין
          </button>
        )}
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
