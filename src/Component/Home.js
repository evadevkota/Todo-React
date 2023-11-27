import React from "react";
import Todo from "./Todo";

export default function Home(props) {
  return <Todo  showAlert={props.showAlert} />;
}
