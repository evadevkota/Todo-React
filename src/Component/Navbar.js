import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  let navigate = useNavigate();
  let navColor = {
    backgroundColor: props.mode === "light" ? "light" : "dark",
  };

  const myStyle = () => {
    if (props.mode === "light" || props.mode === "yellow") {
      return { color: "black", fontSize: "25px" };
    } else {
      return { color: "#F9DEC9", fontSize: "25px" };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/home');
  };

  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${navColor} bg-${navColor}`}>
        <div className="container-fluid">
          <Link className={`nav-link text`} to="/home" style={myStyle()}>
            Todo list
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link text`} style={myStyle()} to="/home">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div
            className="bg-primary rounded mx-2"
            onClick={props.changeBlue}
            style={{ cursor: "pointer", height: "30px", width: "30px" }}
          ></div>
          <div
            className="bg-danger rounded mx-2"
            onClick={props.changered}
            style={{ cursor: "pointer", height: "30px", width: "30px" }}
          ></div>
          <div
            className="bg-success rounded mx-2"
            onClick={props.changegreen}
            style={{ height: "30px", cursor: "pointer", width: "30px" }}
          ></div>
          <div
            className="bg-warning rounded mx-2"
            onClick={props.changeyellow}
            style={{ height: "30px", cursor: "pointer", width: "30px" }}
          ></div>

          <div
            className={`form-check form-switch text-${
              props.mode === "light" ? "dark" : "light"
            }`}
          ></div>

          {!localStorage.getItem('token') ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/createuser">
                Signup
              </Link>
              <Link className="btn btn-primary mx-1" to="/login">
                Login
              </Link>
            </form>
          ) : (
            <button className="btn btn-primary mx-1" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
