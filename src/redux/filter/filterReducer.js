import { FILETERCOMPLETE, FILTERCOLOR } from "./filterActionTypes";

const initialState = {
    complete: "all",
    color: [],
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILETERCOMPLETE:
            return {
                ...state,
                complete: action.payload,
            };

        case FILTERCOLOR:
            const colorType = state.color.includes(action.payload);
            if (colorType) {
                return {
                    ...state,
                    color: state.color.filter(
                        (item) => item !== action.payload
                    ),
                };
            } else {
                return {
                    ...state,
                    color: [...state.color, action.payload],
                };
            }

        default:
            return state;
    }
};

export default filterReducer;
