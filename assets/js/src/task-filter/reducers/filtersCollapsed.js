/**
 * Filter Collapsed reducer
 */

// import actions
import { TOGGLE_FILTERS } from '../actions/index';

export default function filtersCollapsed( state = false, action ) {

    switch ( action.type ) {
        case TOGGLE_FILTERS:
            return !state;
        default:
            return state;
    }

}
