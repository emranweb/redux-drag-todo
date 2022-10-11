import {
  TODOADD,
  TODOCOLORSELECT,
  TODODELETE,
  TODOLOADED,
} from "../todos/todoActionTypes";
import { TODOTOGGLED } from "./../todos/todoActionTypes";

export const fetchData = async (dispatch, getState) => {
  const response = await fetch("http://localhost:9000/todos");
  const data = await response.json();
  dispatch({
    type: TODOLOADED,
    payload: data,
  });
};

export const toggleTodo = (id, status) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:9000/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !status,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const todo = await response.json();
    console.log(todo);
    dispatch({
      type: TODOTOGGLED,
      payload: id,
    });
  };
};

export const colorChange = (id, color) => {
  return async (dispatch, getState) => {
    const response = await fetch(`http://localhost:9000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ color: color }),
    });
    const data = await response.json();

    dispatch({
      type: TODOCOLORSELECT,
      payload: { id, color },
    });
  };
};

export const addTodo = (todo) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:9000/todos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todo,
        completed: true,
        color: "green",
      }),
    });
    const data = await response.json();

    dispatch({
      type: TODOADD,
      payload: {
        title: todo,
        completed: true,
        color: "green",
      },
    });
  };
};

export const deleteTodo = (id) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:9000/todos/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    dispatch({
      type: TODODELETE,
      payload: id,
    });
  };
};
