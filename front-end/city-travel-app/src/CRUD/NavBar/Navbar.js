import { useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//---------------Done With Import---------------//

const NavBar = () => {
  const history = useHistory();

  const [logged, setLogged] = useState(false);
  const [user, SetUser] = useState("");


  console.log(logged);

  useEffect(() => {
    if (localStorage.getItem("admin")) {
      setLogged(true);
      SetUser(localStorage.getItem("admin"));
    } else {
      setLogged(false);
    }
  }, []);



  const logoutHand = () => {
    localStorage.removeItem("admin");

    history.push("/login");
  };



  return (
    <nav class="navbar navbar-expand-lg navbar-light">
      <a
        class="navbar-brand"
        href="#"
        className="txt"
        style={{ paddingLeft: 10 }}
      >
        ❤C-T❤
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active" style={{marginLeft:"20px"}}>
            {logged ? (
              <li class="nav-item" id="navText">
                <Link className="nav-link" to="/login/:email">
                  <span className="navText">DASHBOARD</span>
                </Link>
              </li>
            ) : (
              <li class="nav-item">
                <Link className="nav-link" to="/">
                  <span className="navText"> HOMEPAGE</span>
                </Link>
              </li>
            )}
          </li>
          {logged && (
            <li class="nav-item">
              <Link className="nav-link" to="/add">
                <span className="navText">ADD CITY</span>
              </Link>
            </li>
          )}

          {logged && (
            <li class="nav-item" style={{ textAlign: "right" }}>
              <a class="nav-link " href="#" style={{ marginLeft: 830 }}>
                <span style={{ color: "white" }}>Welcome Back : </span>{" "}
                <span className="navText">
                  {" "}
                  <b>{user}</b>
                </span>
              </a>
            </li>
          )}
          {logged ? (
            <li class="nav-item">
              <Link className="nav-link" onClick={logoutHand}>
                <span className="navText" style={{ marginLeft: 70 }}>
                  {" "}
                  LOGOUT
                </span>
              </Link>
            </li>
          ) : (
            <li>
              {" "}
              <a class="nav-link " href="/login">
                {" "}
                <span className="navText" style={{ marginLeft: 100 }}>
                  {" "}
                  ADMIN LOGIN{" "}
                </span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
