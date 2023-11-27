import TodoContext from "./todocontext";
import { useState } from "react";

const TodoState = (props) => {
  const host = "http://localhost:4000"
  const TodosInitial = []
  const [todos, setTodos] = useState(TodosInitial)

  // Get all Todos
  const getTodos = async () => {
    try {
      const response = await fetch(`${host}/api/todo/gettodo`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
              "auth-token":localStorage.getItem('token')
            },
     
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch todos. Status: ${response.status}`);
      }
  
      const json = await response.json();
      setTodos(json);
    } catch (error) {
      console.error("Error in getTodos:", error);
    }
  }

  // Add a Todo
  const addTodo = async (title, description) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/todo/addtodo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        },
      body: JSON.stringify({title, description})
    });

    const Todo = await response.json();
        console.log(`adding context ${Todo}`) 
    setTodos(todos.concat(Todo))
  }

  // Delete a Todo
  const deleteTodo = async (_id) => {
    // API Call
    const response = await fetch(`${host}/api/todo/deletetodo/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        },
    });
    const json = response.json();
    console.log(`deleting context ${json}`) 
    const newTodos = todos.filter((todo) => { return todo._id !== _id })
    setTodos(newTodos)
  }

  // Edit a Todo
  const editTodo = async (_id, title, description) => {
    // API Call 
    const response = await fetch(`${host}/api/Todos/updateTodo/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        },
      body: JSON.stringify({title, description})
    });
    const json = await response.json(); 
    console.log(json)

     let newTodos = JSON.parse(JSON.stringify(todos))
    // Logic to edit in client
    for (let index = 0; index < newTodos.length; index++) {
      const element = newTodos[index];
      if (element._id === _id) {
        newTodos[index].title = title;
        newTodos[index].description = description;
      
        break; 
      }
    }  
    setTodos(newTodos);
  }

  return (
<TodoContext.Provider value={{ todos, addTodo, deleteTodo, editTodo, getTodos }}>
  {props.children}
</TodoContext.Provider>
  )

}
export default TodoState;