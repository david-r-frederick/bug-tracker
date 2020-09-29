import { CHANGE_COLOR_THEME } from '../actions/actionTypes';

const initialState = {
    color: 'dark',
};

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_COLOR_THEME:
            return { ...state, color: action.payload };
        default:
            return state;
    }
};

export default themeReducer;
