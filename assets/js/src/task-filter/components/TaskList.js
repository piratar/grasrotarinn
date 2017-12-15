// import dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import components
import Task from './Task';

function TaskList( { tasks } ) {

    return (
        <div className="task-list">
            { tasks.map( ( task, i ) => <Task key={ i } task={ task } /> ) }
        </div>
    );

}

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired
};

export default TaskList;
