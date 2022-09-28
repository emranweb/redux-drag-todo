import { FILETERCOMPLETE, FILTERCOLOR } from "./filterActionTypes";

const initialState = {
  complete: "complte",
  color: ["red", "green", "yellow"],
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILETERCOMPLETE:
      return {
        ...state,
        complete: action.payload,
      };

    case FILTERCOLOR:
      const { color, colorType } = action.payload;
      switch (colorType) {
        case "added":
          return {
            ...state,
            color: [...state.color, color],
          };

        case "remove":
          return {
            ...state,
            color: state.color.filter((item) => item !== color),
          };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default filterReducer;
