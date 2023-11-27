import "./App.css";
import Home from "./Component/Home";
import Navbar from "./Component/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoState from "./Context/todostate";
import Alert from "./Component/Alert";
import React, { useState } from "react";
import Createuser from "./Component/Createuser";
import UserLogin from "./Component/UserLogin";


function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const changegreen = () => {
    // Change color green and display a success alert

    document.body.style.backgroundColor = "#3A4D39";
    document.body.style.color = "#ECE3CE";
    document.body.style.fontFamily = "Times";

    showAlert("Green Mode has been enabled", "success");
  };

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const changeyellow = () => {
    // Change color yellow and display a success alert
    setMode("yellow");
    document.body.style.backgroundColor = "#F4C430";
    document.body.style.color = "black";
    document.body.style.fontFamily = "Times";
    showAlert("Yellow Mode has been enabled", "success");
  };
  const changered = () => {
    // Change color red and display a success alert
    setMode("red");
    document.body.style.backgroundColor = "#3D0C11";
    document.body.style.color = "black";
    document.body.style.color = "#F9DEC9";
    document.body.style.fontFamily = "Times";
    showAlert("Red Mode has been enabled", "success");
  };
  const changeBlue = () => {
    // Change color blue and display a success alert
    setMode("blue");
    document.body.style.backgroundColor = "#264d73";
    document.body.style.color = "#F9DEC9";
    document.body.style.fontFamily = "Times";
    showAlert("Blue Mode has been enabled", "success");
  };

  return (
    <>
      <TodoState>
        <Router>
          <Navbar
            mode={mode}
            changeBlue={changeBlue}
            changegreen={changegreen}
            changered={changered}
            changeyellow={changeyellow}
          />
          <Alert alert={alert} />
          <div className="container my-4">
            <Routes>
              <Route
                path="/home"
                element={<Home mode={mode} showAlert={showAlert} />}
              />
         
              <Route
                path="/login"
                element={<UserLogin mode={mode} showAlert={showAlert} />}
              />
              <Route
                path="/createuser"
                element={<Createuser mode={mode} showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </Router>
      </TodoState>
    </>
  );
}

export default App;
