// import dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import components
import Filter from './Filter';

class FilterCategory extends Component {

    constructor( props ) {
        super( props );

    }

    /**
     * count number of task which would be available if that particular filter is checked
     *
     * @since 1.0.0
     * @param  {Array}   tasks          array of available tasks
     * @param  {Number}  filterId       id of the filter/term
     * @param  {Array}   activeFilters  id of the filter/term
     * @return {Number}                 number of avaialbe tasks when filter is selected
     */
    countTasks( filterId, tasks, activeFilters ) {
        // count variable
        let count;
        // if filter is in active filters just count available tasks
        if ( activeFilters.indexOf( filterId ) > -1 ) {
            count = tasks.length;
        } else { // if filter not in active filters filter tasks based on it's id
            count = tasks.filter( task => task.all_terms.indexOf( filterId ) > -1 ).length;
        }

        return count;

    }

    /**
     * check if filter is checked by checking if it is in active filters
     *
     * @since 1.0.0
     * @param  {Number}  filterId       id of the filter/term
     * @param  {Array}   activeFilters  id of the filter/term
     * @return {Boolean}                whether tasks is checked
     */
    isFilterChecked( filterId, activeFilters ) {
        return activeFilters.indexOf( filterId ) > -1;
    }

    /**
     * add properties to filters array and sort it by count property
     *
     * @since 1.0.0
     * @param  {Array}   filters        array of all filters
     * @param  {Array}   tasks          array of available tasks
     * @param  {Array}   activeFilters  id of the filter/term
     * @return {Array}                  array of filters prepared for UI
     */
    prepareFilters( filters, tasks, activeFilters ) {
        // add count and is checked properties to each filter and child filters if any
        let preparedFilters = filters.map( filter => {
            filter.numberOfTasks = this.countTasks( filter.id, tasks, activeFilters );
            filter.isChecked = this.isFilterChecked( filter.id, activeFilters );
            if ( filter.children ) {
                filter.children.map( childFilter => {
                    childFilter.numberOfTasks = this.countTasks( childFilter.id, tasks, activeFilters );
                    childFilter.isChecked = this.isFilterChecked( childFilter.id, activeFilters );
                });
            }
            return filter;
        });

        return preparedFilters;
    }

    /**
     * sorts filters by number of tasks
     *
     * @since 1.0.0
     * @param  {Array} filters  filters to sort
     * @return {Array}          sorted filters
     */
    sortFilters( filters ) {
        // sort filters by count
        return filters.sort( ( a, b ) => {
            // compare count value
            const compare = a.numberOfTasks - b.numberOfTasks;
            // sort descending:
            if ( compare > 0 ) {
                return -1;
            }
            if ( compare < 0 ) {
                return 1;
            }

            return 0;
        });

    }

    /**
     * sum children's number of tasks
     *
     * @since 1.0.0
     * @param {Array} children
     * @return {Number}
     */
    sumChildNumOfTasks( children ) {

        return children.reduce( ( sum, child ) => { return sum + child.numberOfTasks }, 0 );
    }

    render() {
        // get filters, tasks and activeFilters from props
        const { name, filters, tasks, activeFilters, parentFilters, filterChange, toggleParentFilter } = this.props;

        // prepare filters
        const preparedFilters = this.prepareFilters( filters, tasks, activeFilters );

        // if it's division render with parent term wrapper
        if ( name == 'Division' ) {
            
            return (
                <div className="filter-category">
                    <div className="filter-category__title">Hópar</div>
                    { preparedFilters.map( ( filter, i ) => {
                        // sum of childrens's tasks number if there is any children
                        let childrenTaskCount = 0;
                        if ( filter.children ) childrenTaskCount = this.sumChildNumOfTasks( filter.children );
                        return (
                            <div className="filter-category__parent-filter-wrapper" key={ i }>
                                <button
                                    className={ !parentFilters[filter.id] ? 'filter-category__parent-filter' : 'filter-category__parent-filter collapsed' }
                                    onClick={ toggleParentFilter.bind( null, filter.id ) }>
                                    { filter.name } ({ childrenTaskCount })
                                </button>
                                <div>
                                    { !parentFilters[filter.id] && filter.children ? this.sortFilters( filter.children ).map( ( childFilter, i ) =>
                                        <Filter key={ i } { ...childFilter } filterCatName={ name } filterChange={ filterChange } /> )
                                        : null }
                                </div>
                            </div>
                        );
                    }) }
                </div>
            );
        }
        // render filter list
        //@TODO: whether category has a name? { name != 'Category' ? <div>{ name }</div> : null }
        return (
            <div className={ name === 'Category' ? 'filter-category filter-category--cat' : 'filter-category' }>
                <div className="filter-category__title">{ name == 'Category' ? 'Málefni' : 'Verk' }</div>
                <div className={ name == 'Category' ? 'filter-category__filters-wrapper filter-category--cat__filters-wrapper' : 'filter-category__filters-wrapper' }>
                    { this.sortFilters( preparedFilters ).map( ( filter, i ) => <Filter key={ i } { ...filter } categoryIcon={ filter.category_icon } filterCatName={ name } filterChange={ filterChange } /> ) }
                </div>
            </div>
        );
    }

}

FilterCategory.propTypes = {
    name: PropTypes.string,
    filters: PropTypes.array.isRequired,
    tasks: PropTypes.array.isRequired,
    activeFilters: PropTypes.array.isRequired,
    parentFilters: PropTypes.object.isRequired,
    filterChange: PropTypes.func.isRequired,
    toggleParentFilter: PropTypes.func
};

export default FilterCategory;
