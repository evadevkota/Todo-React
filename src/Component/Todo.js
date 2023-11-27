import { useContext, useRef, useEffect, useState } from "react";
import TodoContext from "../Context/todocontext";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import { useNavigate } from "react-router-dom";

const Todo = (props) => {
  let navigate = useNavigate();
  const refClose = useRef(null)
  const context = useContext(TodoContext);
  const { todos, getTodos,editTodo } = context;

  // Include 'getTodos' and 'navigate' in the dependency array
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTodos();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    } else {
      navigate("/login");
    }
  }, [getTodos, navigate]);
  const ref = useRef(null);
  const [todo, settodo] = useState({ etitle: "", edescription: "" });

  const updateTodo = (currentTodo) => {
    ref.current.click();
    settodo({id: currentTodo._id, etitle: currentTodo.title, edescription: currentTodo.description, etag:currentTodo.tag})
}

const handleClick = (e)=>{ 
    editTodo(todo.id, todo.etitle, todo.edescription)
    refClose.current.click();
}

const onChange = (e)=>{
    settodo({...todo, [e.target.name]: e.target.value})
}



  return (
    <>
      <AddTodo showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={todo.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={todo.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={todo.etitle.length<5 || todo.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Todo</button>
                        </div>
                    </div>
                </div>
            </div>
      <h2>Your todos</h2>
      {todos.length === 0 ? (
        <p>No todos to display</p>
      ) : (
      <div className="row my-3">
        {/* Check if todos is defined before mapping */}
        {todos &&
          todos.map((todo) => (
            <TodoItem key={todo._id} updateTodo={updateTodo} todo={todo} />
          ))}
      </div>)}
    </>
  );
};

export default Todo;
