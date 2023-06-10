// todo add action

import {
  TODOCLEARALL,
  TODOADD,
  TODOCOLORSELECT,
  TODOCOMPLETEALL,
  TODODELETE,
  TODOTOGGLED,
} from './todoActionTypes';

export const todoAddAction = action => {
  return {
    type: TODOADD,
    payload: action.payload,
  };
};

export const todoDeleteAction = action => {
  return {
    type: TODODELETE,
    payload: action.payload,
  };
};

export const todoColorSelectAction = action => {
  return {
    type: TODOCOLORSELECT,
    payload: action.payload,
  };
};

export const todoCompleteAllAction = () => {
  return {
    type: TODOCOMPLETEALL,
  };
};

export const todoClearCompleteAction = () => {
  return {
    type: TODOCLEARALL,
  };
};

export const todoToggledAction = action => {
  return {
    type: TODOTOGGLED,
    payload: action.payload,
  };
};
