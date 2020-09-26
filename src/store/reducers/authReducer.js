import { SET_REDUX_USER, REMOVE_REDUX_USER, SET_DISPLAY_NAME } from '../actions/actionTypes';

// const authStart = (state) => {
//     return {};
// };

// const authSuccess = (state, action) => {
//     return {};
// };

// const authFailure = (state, action) => {
//     return {};
// };

// const authLogout = (state, action) => {
//     return {};
// };

const initialState = {
    displayName: '',
    token: '',
    user: {},
    error: null,
    authRedirectPath: '/',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DISPLAY_NAME:
            return {
                ...state,
                displayName: action.payload.displayName,
            };
        case SET_REDUX_USER:
            const { token, user } = action.payload;
            return {
                ...state,
                token,
                user,
            };
        case REMOVE_REDUX_USER:
            return { ...initialState };
        default:
            return state;
    }
};

export default authReducer;
