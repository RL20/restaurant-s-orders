import React, { useState } from "react";
import { creatUser } from "../../api/Api";
import "./Signup.css";

function Signup({ setNewUser, setToken, setSingin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [currentToken, setCurrentToken] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUserObject = {
      name,
      email,
      password,
    };
    try {
      // const res = await API.post("/users", newUserObject);
      const res = await creatUser(newUserObject);
      setToken(res.data.token); // when create a new user log automatically  anvoid send user to log
      setCurrentToken(res.data.token);
      localStorage.setItem("token", JSON.stringify(currentToken));
    } catch (err) {
      setMessage("הפרטים שהזנת אינם תקינים");
      setError(true);
    }
    // handleReload();
    // window.location.reload();
  };

  /****************************************** */
  return (
    <div className="signup-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="title">הרשמה </h1>

        <div className="form-row2">
          <span className=".input-label"> שם</span>
          <input className="signup-form-input" type="text" onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <span className=".input-label">אימייל</span>
          <input className="signup-form-input" type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <span className=".input-label">סיסמה</span>
          <input className="signup-form-input" type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        {message && <div className="error">{message} </div>}

        <div className="btn-wrap">
          <button className="signup-form-btn" type="button" onClick={() => setSingin(false)}>
            ביטול
          </button>
          <button className="signup-form-btn" disabled={password < 7 || !email || name.trim() < 2} onClick={(e) => handleSubmit(e)}>
            שמירה
          </button>
        </div>
      </form>

      {error}
    </div>
  );
  // return (
  //   <div className="form-container">
  //     <form className="form-update" onSubmit={handleSubmit}>
  //       <div className="welcome">Create a New Account</div>
  //       <div className="form-row1"></div>
  //       <div className="form-row2">
  //         <span className=".input-label"> שם</span>
  //         <input className="input-field" type="text" onChange={(e) => setName(e.target.value)} />
  //       </div>

  //       <div>
  //         <span className=".input-label">אימייל</span>

  //         <input className="input-field" type="text" onChange={(e) => setEmail(e.target.value)} />
  //       </div>
  //       <div>
  //         <span className=".input-label">סיסמה</span>

  //         <input className="input-field" type="password" onChange={(e) => setPassword(e.target.value)} />
  //       </div>
  //       <div className="form-row3">
  //         <button className="ui primary button" onClick={(e) => handleSubmit(e)}>
  //           שמירה
  //         </button>
  //         <button className="ui  button" onClick={(e) => setNewUser(false)}>
  //           ביטול
  //         </button>
  //       </div>
  //     </form>
  //     {error}
  //   </div>
  // );
}
export default Signup;
