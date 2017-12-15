/**
 * Parent Filters reducer
 */

// import actions
import { TOGGLE_PARENT_FILTER } from '../actions/index';

export default function parentFilters( state = {}, action ) {

    switch ( action.type ) {
        case TOGGLE_PARENT_FILTER:
            const parentData = {};
            parentData[action.parentId] = !state[action.parentId];
            return Object.assign( {}, state, parentData );
        default:
            return state;
    }

}
