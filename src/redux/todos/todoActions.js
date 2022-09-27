// todo add action

import { TODODELETE, TODOTOGGLED } from "./todoActionTypes";

const todoAddAction = (action) => {
  return {
    type: TODOTOGGLED,
    payload: action.payload,
  };
};

const todoDeleteAction = (action) => {
  return {
    type: TODODELETE,
    payload: action.payload,
  };
};
