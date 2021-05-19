import React from "react";
import { ACTIONS } from "./TodoList";

const Todo = ({ todo, dispatch }) => {
  return (
    <div>
      <div class={todo.complete ? "alert alert-info" : "alert alert-dark"}>
        {todo.name}
        <span className="float-right">
          <button
            onClick={(e) =>
              dispatch({ type: ACTIONS.COMPLETE, payload: todo.id })
            }
            className="btn btn-sm btn-primary mr-2"
          >
            Complete
          </button>
          <button
            onClick={(e) =>
              dispatch({ type: ACTIONS.DELETE, payload: todo.id })
            }
            className="btn btn-sm btn-primary mr-2"
          >
            Delete
          </button>
        </span>
      </div>
    </div>
  );
};

export default Todo;
