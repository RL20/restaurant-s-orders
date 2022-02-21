import { BrowserRouter, Route, Switch, useHistory, createContext } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Homepage from "./components/HomePage";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
// import Users from "./components/Users";
import Orders from "./components/Orders";
import OrdersDone from "./components/OrdersDone";
import UsersActions from "./components/UsersActions";
import Customer from "./components/Customer/Customer";
import Unauthorized from "./components/Unauthorized";
import "./App.css";
import { getUserByToken } from "./api/Api";

// import jwt from "jsonwebtoken";
function App() {
  const [token, setToken] = useState(null);
  const [loggedUser, setLoggedUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    }
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    setToken(userToken);
    // history.push("/home");
  }, [token]);

  useEffect(() => {
    if (loggedUser?.name) {
      console.log("hello from logged");
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    }
    const userString = localStorage.getItem("loggedUser");
    if (userString !== JSON.stringify(loggedUser) || !loggedUser.name) {
      const userObj = JSON.parse(userString);
      setLoggedUser(userObj);
    }
  }, [loggedUser]);

  if (!token) {
    return <Login setToken={setToken} setLoggedUser={setLoggedUser} setIsAdmin={setIsAdmin} />;
  }
  const reset = () => {
    setToken(null);
    setLoggedUser({});
  };
  return (
    <div className="App">
      {console.log("loggedUser", loggedUser)}
      <BrowserRouter>
        {loggedUser?.isAdmin && <Header />}
        <Switch>
          {/* if uder.isAdmi{} */}

          <Route path="/" exact render={() => <Customer loggedUser={loggedUser} handleLogout={reset} />} />
          {/* <Route path="/" exact component={Customer} /> */}

          {loggedUser?.isAdmin ? (
            <>
              <Route path="/admin" exact component={Homepage} />
              <Route path="/admin/actions" exact component={UsersActions} />
              <Route path="/admin/orders" exact render={() => <Orders loggedUser={loggedUser} />} />
              <Route path="/admin/ordersdone" exact render={() => <OrdersDone loggedUser={loggedUser} />} />

              {/* <Route Path="/admin/orders" exact>
                <Orders loggedUser={loggedUser} />
              </Route> */}
            </>
          ) : (
            <Route path="/admin" component={Unauthorized} />
          )}

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
