import React, { useState, useEffect } from "react";
import "./Login.css";
import { login } from "../../api/Api";
import Signup from "../Signup/Signup";
/****************************************************** */
export default function Login({ setToken, setLoggedUser }) {
  // const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [singin, setSingin] = useState(false);
  const [message, setMessage] = useState(true);
  const [newUser, setNewUser] = useState(true);

  /****************************************************** */
  const handleReload = () => {
    console.log("clulu");
    setSingin(false);
  };
  /****************************************************** */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      console.log("res", res.data.user.name);
      setToken(res.data.token);
      const a = res.data.user; // ←user
      //check if is admin and if it dose set isAdmin
      console.log("isAdmin", a.isAdmin);
      console.log("a", a);
      setLoggedUser(a);
    } catch (err) {
      setMessage("אימייל או סיסמא אינם תקינים");
      setError(err);
      console.log(error);
    }
  };
  /********************************************************** */
  if (singin) return <Signup setSingin={setSingin} />;
  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>התחברות </h1>
        {/* <label>
          <p>אימייל</p>
        </label> */}
        <div className="ui left icon input">
          <input className="form-input" type="text" placeholder="אימייל" autoComplete="on" onChange={(e) => setEmail(e.target.value)} />
          <i className="user icon"></i>
        </div>

        {/* <label>
          <p>סיסמה</p>
        </label> */}
        <div className="ui left icon input">
          <input placeholder="סיסמה" className="form-input" type="password" autoComplete="on" onChange={(e) => setPassword(e.target.value)} />
          <i className="lock icon"></i>
        </div>
        <div>
          <button className="btn1" type="submit" disabled={password.length < 7 || !email}>
            כניסה
          </button>
        </div>
        {message && <div className="error">{message} </div>}
        {/* {message && <div>אימייל או סיסמא אינם תקינים</div>} */}
      </form>
      <div className="signup" onClick={() => setSingin(!singin)}>
        הרשם
      </div>
    </div>
  );
}
