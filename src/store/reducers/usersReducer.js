import { ADD_FIREBASE_USER_TO_LOCAL } from '../actions/actionTypes';

const initialState = [];

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FIREBASE_USER_TO_LOCAL:
            let stateIncludesUser = false;
            for (let i = 0; i < state.length; i++) {
                if (state[i].uid === action.payload.userObj.uid) {
                    stateIncludesUser = true;
                    break;
                }
            }
            return stateIncludesUser ? [...state] : state.concat(action.payload.userObj);
        default:
            return state;
    }
};

export default usersReducer;
