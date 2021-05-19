import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ACTIONS } from "./TodoList";

const TodoForm = ({ dispatch }) => {
  const [todo, setTodo] = useState({
    id: uuidv4(),
    name: "",
    complete: false,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD, payload: todo });
    setTodo({ ...todo, name: "" });
  };
  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label>Enter Todo Item</label>
          <input
            type="text"
            value={todo.name}
            onChange={(e) => setTodo({ ...todo, name: e.target.value })}
            class="form-control"
            placeholder="Enter Todo"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
