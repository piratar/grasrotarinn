// import dependencies
import { combineReducers } from 'redux';

// import reducers
import activeFilters from './activeFilters';
import filtersCollapsed from './filtersCollapsed';
import parentFilters from './parentFilters';

const rootReducer = combineReducers({
    activeFilters,
    filtersCollapsed,
    parentFilters
});

export default rootReducer;
