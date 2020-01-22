import {combineReducers} from 'redux';
import ActionTypes from './action_types';

function rhsPluginAction(state = null, action) {
    switch (action.type) {
    case ActionTypes.RECEIVED_SHOW_RHS_ACTION:
        return action.showRHSPluginAction;
    default:
        return state;
    }
}

export default combineReducers({
    rhsPluginAction,
});
