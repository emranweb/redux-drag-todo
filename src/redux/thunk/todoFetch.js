import { TODOLOADED } from "../todos/todoActionTypes";

export const fetchData = async (dispatch, getState) => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  const data = await response.json();
  dispatch({
    type: TODOLOADED,
    payload: data,
  });
  console.log(data);
};

const addData = (todoId) => {
  return async (dispatch, getState) => {
    await fetch(`http://localhost:9000/todos/${todoId}`, {
      method: "DELETE",
    });
    dispatch({
      type: "addtods",
      payload: todoId,
    });
  };
};
