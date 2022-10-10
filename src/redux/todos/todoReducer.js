import { faker } from "@faker-js/faker";
import {
  TODOADD,
  TODOCLEARALL,
  TODOCOLORSELECT,
  TODOCOMPLETEALL,
  TODODELETE,
  TODOLOADED,
  TODOTOGGLED,
} from "./todoActionTypes";

const initialState = [
  {
    id: faker.datatype.uuid(),
    text: "First Text",
    complete: true,
    color: "green",
  },
  {
    id: faker.datatype.uuid(),
    text: "Second  Text",
    complete: false,
    color: "red",
  },
];

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TODOLOADED:
      return action.payload;

    case TODOADD:
      return [
        ...state,
        {
          id: faker.datatype.uuid(),
          text: action.payload,
          color: "green",
          complete: false,
        },
      ];

    case TODOCOMPLETEALL:
      return state.map((item) => {
        return { ...item, complete: true };
      });

    case TODOCLEARALL:
      return state.filter((item) => !item.complete);

    case TODODELETE:
      return state.filter((item) => item.id !== action.payload);

    case TODOCOLORSELECT:
      const { id, color } = action.payload;
      return state.map((item) => {
        if (item.id !== id) {
          return item;
        }
        return { ...item, color: color };
      });

    case TODOTOGGLED:
      return state.map((item) => {
        if (item.id !== action.payload) {
          return item;
        }
        return {
          ...item,
          completed: !item.completed,
        };
      });

    default:
      return state;
  }
};

export default todoReducer;
