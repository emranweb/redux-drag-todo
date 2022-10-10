import { TODOLOADED } from "../todos/todoActionTypes";
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
