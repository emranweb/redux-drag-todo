import { faker } from "@faker-js/faker";
import { TODOADD } from "./todoActionTypes";

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
    case TODOADD:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default todoReducer;
