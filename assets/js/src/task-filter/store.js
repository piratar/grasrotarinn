// import redux dependencies
import { createStore, compose } from 'redux';

// import root reducer
import rootReducer from './reducers/index';

const defaultState = {
    activeFilters: [],
    filtersCollapsed: false,
    parentFilters: window.TASK_FILTER_DATA.parent_filters
};

// add redux dev tools to store
const enhancers = compose( window.devToolsExtension ? window.devToolsExtension() : f => f );

const store = createStore( rootReducer, defaultState, enhancers );

export default store;
