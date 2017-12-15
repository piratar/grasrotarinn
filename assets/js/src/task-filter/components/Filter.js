import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
    /**
     * constructor method
     *
     * @param {Object} props
     */
    constructor( props ) {
        super( props )
    }

    /**
     * ###### THIS FUNCTIONALITY HAS BEEN MOVED TO FilterCategory ########
     *
     * @since 1.0.0
     * @param {Array} children
     * @return {Number}
     */
    sumChildNumOfTasks( children ) {

        return children.reduce( ( sum, child ) => { return sum + child.numberOfTasks }, 0 );
    }

    /**
     * render filter checkbox or parent accordion with children checkboxes
     */

    render() {
        const { categoryIcon, id, name, numberOfTasks, isChecked, filterCatName, children, filterChange } = this.props;

        return (
            <label className={ filterCatName == 'Category' ?
                               isChecked ? 'filter filter--category selected' :
                               !numberOfTasks ? 'filter filter--category disabled' : 'filter filter--category' :
                               isChecked ? 'filter selected' : 'filter' } key={ id }>
                { categoryIcon ? <div className="filter--category__icon" style={ { backgroundImage: `url('${categoryIcon}')` } } ></div> : null }
                <input id={ id } className={ filterCatName == 'Category' ? 'filter__checkbox filter--category__checkbox' : 'filter__checkbox' } type="checkbox" checked={ isChecked } disabled={ !numberOfTasks } onChange={ filterChange.bind(null, id) }/>
                { name } { !(filterCatName == 'Category') ? ` (${numberOfTasks})` : null }
            </label>
        );
    }

}

Filter.propTypes = {
    categoryIcon: PropTypes.string,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    numberOfTasks: PropTypes.number,
    isChecked: PropTypes.bool.isRequired,
    children: PropTypes.array,
    filterChange: PropTypes.func.isRequired
};

export default Filter;
