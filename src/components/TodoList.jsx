import React, { useReducer, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

export const ACTIONS = {
  FORM: "TOGGLE_FORM",
  ADD: "ADD_TODO",
  COMPLETE: "COMPLETE_TODO",
  DELETE: "DELETE_TODO",
  GET: "GET_LOCAL_STORAGE",
};

const LOCALKEY = "TODO_LIST_ITEM";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FORM:
      let obj = { ...state, form: !state.form };
      localStorage.setItem(LOCALKEY, JSON.stringify(obj));
      return obj;
    case ACTIONS.ADD:
      const objj = {
        ...state,
        todos: [...state.todos, action.payload],
        form: !state.form,
      };
      localStorage.setItem(LOCALKEY, JSON.stringify(objj));
      return objj;
    case ACTIONS.COMPLETE:
      const result = {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) return { ...todo, complete: true };
          else return todo;
        }),
      };
      localStorage.setItem(LOCALKEY, JSON.stringify(result));
      return result;
    case ACTIONS.DELETE:
      const res = {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
      localStorage.setItem(LOCALKEY, JSON.stringify(res));
      return res;
    case ACTIONS.GET:
      state = action.payload;
      return state;
    default:
      return state;
  }
};
const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, { form: false, todos: [] });
  useEffect(() => {
    const values = JSON.parse(localStorage.getItem(LOCALKEY));
    if (values) {
      dispatch({ type: ACTIONS.GET, payload: values });
    }
  }, []);
  return (
    <div className="container">
      <div className="bg-info p-5 mt-3 text-light">
        <span className="float-left">
          <h4>TODO LIST WITH REDUCER AND LOCAL STORAGE</h4>
        </span>
        <span className="float-right">
          <button
            onClick={(e) => dispatch({ type: ACTIONS.FORM })}
            className="btn btn-sm btn-primary float-right"
          >
            Add
          </button>
        </span>
      </div>
      {state.form && <TodoForm dispatch={dispatch} />}
      <div className="mt-5">
        {state.todos.length > 0 &&
          state.todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
          })}
      </div>
    </div>
  );
};

export default TodoList;
