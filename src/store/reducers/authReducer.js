import { SET_REDUX_USER, REMOVE_REDUX_USER, SET_DISPLAY_NAME, SET_ADMIN } from '../actions/actionTypes';

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
        case SET_ADMIN:
            return {...state, isAdmin: action.payload.isAdmin };
        default:
            return state;
    }
};

export default authReducer;
