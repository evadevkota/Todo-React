import React, {useContext, useState} from 'react'
import TodoContext from '../Context/todocontext';


const AddTodo = (props) => {
    const context = useContext(TodoContext);
    const {addTodo} = context;

    const [todo, setTodo] = useState({title: "", description: "",  })

    const handleClick = (e)=>{
        e.preventDefault();
        addTodo(todo.title, todo.description);
        setTodo({title: "", description: ""})
        props.showAlert("New Todoist has been added", "success");
      
    }

    const onChange = (e)=>{
        setTodo({...todo, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a todo</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={todo.title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={todo.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor=" " className="form-label"> </label>
                    
                </div>
               
                <button disabled={todo.title.length<5 || todo.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add todo</button>
            </form>
        </div>
    )
}

export default AddTodo
