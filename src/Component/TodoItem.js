import React, { useContext } from "react";
import TodoContext from "../Context/todocontext";

const TodoItem  = (props) => {
  const context = useContext(TodoContext);
  const { deleteTodo } = context;
  const { todo, updateTodo } = props;
  
  const myStyle = {
    color: "black"
  };
  return (
    <div className="col-md-3">
    <div className="card my-3">
        <div className="card-body">
            <div className="d-flex align-items-center">
                <h5 className="card-title" style={myStyle}>{todo.title}</h5>
                <i className="far fa-trash-alt mx-2" style={myStyle} onClick={()=>{deleteTodo(todo._id)}}></i>
                <i className="far fa-edit mx-2"  style={myStyle} onClick={()=>{updateTodo(todo)}}></i>
            </div>
            <p className="card-text">{todo.description}</p>

        </div>
    </div>
</div>
  );
}




export default TodoItem 