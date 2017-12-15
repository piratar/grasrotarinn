/**
 * Active Filters reducer
 */

// import actions
import {
    FILTER_CHANGE,
    FILTER_RESET
} from '../actions/index';

export default function activeFilters( state = [], action ) {
    switch ( action.type ) {
        case FILTER_CHANGE:
            // get index of currently toggled filter if it's in activeFilters
            const currentFilterIndex = state.indexOf( action.filterId );
            // if it is in an active filters remove it
            if ( currentFilterIndex > -1 ) {
                return [ ...state.slice( 0, currentFilterIndex ), ...state.slice( currentFilterIndex + 1 ) ]
            } else { // if it's not in it add it
                return [ ...state, action.filterId ];
            }
        case FILTER_RESET:
            return [];
        default:
            return state;
    }
}
