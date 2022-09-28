// todo add action

import {
  TODOCLEARALL,
  TODOCOLORSELECT,
  TODOCOMPLETEALL,
  TODODELETE,
  TODOTOGGLED,
} from "./todoActionTypes";

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

const todoColorSelectAction = (action) => {
  return {
    type: TODOCOLORSELECT,
    payload: action.payload,
  };
};

const todoCompleteAllAction = () => {
  return {
    type: TODOCOMPLETEALL,
  };
};

const todoClearCompleteAction = () => {
  return {
    type: TODOCLEARALL,
  };
};

const todoToggledAction = (action) => {
  return {
    type: TODOTOGGLED,
    payload: action.payload,
  };
};
