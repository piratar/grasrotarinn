/**
 * Actions
 */

/*##################
### ACTION TYPES ###
##################*/

export const FILTER_CHANGE = 'FILTER_CHANGE';
export const FILTER_RESET = 'FILTER_RESET';
export const TOGGLE_FILTERS = 'TOGGLE_FILTERS';
export const TOGGLE_PARENT_FILTER = 'TOGGLE_PARENT_FILTER';

/*#####################
### ACTION CREATORS ###
#####################*/

export function filterChange( filterId ) {
    return {
        type: FILTER_CHANGE,
        filterId
    };
}

export function filterReset() {
    return {
        type: FILTER_RESET
    };
}

export function toggleFilters() {
    return {
        type: TOGGLE_FILTERS
    }
}

export function toggleParentFilter( parentId ) {
    return {
        type: TOGGLE_PARENT_FILTER,
        parentId
    }
}
