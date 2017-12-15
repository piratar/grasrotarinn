// import dependencies
import React, { Component } from 'react';

// import modules
import FilterBar from './FilterBar';
import FilterList from './FilterList';
import TaskList from './TaskList';

class TaskFilter extends Component {
    /**
     * Constructor method
     *
     * @since 1.0.0
     * @param {Object} props properties of the Component
     */
    constructor( props ) {
        super( props );
        this.filtersData = window.TASK_FILTER_DATA;
    }

    /**
     * Filter tasks based on active filters
     *
     * @since 1.0.0
     * @access
     * @param {Array} tasks          all tasks
     * @param {Array} activeFilters  currently active filters
     * @return {Array}               filtered tasks
     */
    filterTasks( tasks, activeFilters ) {
        // filter task based on active filters
        return tasks.filter( task => {
            // indicator whether task should be shown to user
            let shouldTaskBeShown = true;
            // loop through active filters if some of them are not attached to current task
            // task should not be shown to user
            for ( let i = 0; i < activeFilters.length; i++ ) {
                    if ( task.all_terms.indexOf( activeFilters[i] ) < 0 ) {
                        shouldTaskBeShown = false;
                        break;
                    }
                }
            return shouldTaskBeShown;
        });

    }

    render() {
        const { filters, tasks } = this.filtersData;
        const { activeFilters } = this.props;
        // prepare tasks
        const filteredTasks = this.filterTasks( tasks, activeFilters );
        // prepare filters
        return (
            <div className="task-filter">
                <FilterBar { ...this.props } />
                <FilterList { ...this.filtersData } { ...this.props } tasks={ filteredTasks } />
                <TaskList tasks={ filteredTasks } filters={ filters } />
            </div>
        );
    }

}

export default TaskFilter;
