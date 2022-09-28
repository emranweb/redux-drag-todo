import { FILETERCOMPLETE, FILTERCOLOR } from "./filterActionTypes";

export const filterCompleteAction = (action) => {
  return {
    type: FILETERCOMPLETE,
    payload: action.payload,
  };
};

export const filterColorAction = (action) => {
  return {
    type: FILTERCOLOR,
    payload: action.payload,
  };
};
