// import dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

function Task( { task } ) {

    return (
        <div className="task-preview">
            <a className="task-preview__link" href={ task.link }></a>
            <div className="task-preview__skill">
                { task.terms.skill.join( ', ' ) }
            </div>
            <div className="task-preview__info-wrapper">
                <div className="task-preview__main-info">
                    <div className="task-preview__division">
                        { task.terms.division.join( ', ' ) }
                    </div>
                    <div className="task-preview__title">
                        { task.title }
                    </div>
                </div>
                <div className="task-preview__description">
                    <div className="task-preview__hrs-per-week">
                        <p className="task-preview__bold-text"> { task.hours_per_week } </p> Klst á viku
                    </div>
                    <div className="task-preview__lang-skills">
                        <p className="task-preview__bold-text"> { task.language_skills.join( ', ' ) } - </p> Tungumál
                    </div>
                </div>
            </div>

            <div className="task-preview__category">
                <span className="task-preview__category-icon" style={ { backgroundImage: `url('${task.terms.task_category.icon}')` } }></span>
                <div className="task-preview__category-text">
                    { task.terms.task_category.name }
                </div>
            </div>
        </div>
    );

}

Task.propTypes = {
    task: PropTypes.object.isRequired
};

export default Task;
