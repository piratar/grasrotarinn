// import dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import components
import TaskFilter from '../components/TaskFilter';

// import action creators
import * as actions from '../actions/index';

function mapStateToProps( state ) {
    return {
        activeFilters: state.activeFilters,
        filtersCollapsed: state.filtersCollapsed,
        parentFilters: state.parentFilters
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( actions, dispatch );
}

const App = connect( mapStateToProps, mapDispatchToProps )( TaskFilter );

export default App;
