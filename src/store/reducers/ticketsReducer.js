import { ADD_USER_TICKET, CLEAR_LOCAL_TICKETS } from '../actions/actionTypes';

const initialState = [];

const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_TICKET:
            return state.concat(action.payload.ticket);
        case CLEAR_LOCAL_TICKETS:
            return [...initialState];
        default:
            return state;
    }
};

export default ticketsReducer;
