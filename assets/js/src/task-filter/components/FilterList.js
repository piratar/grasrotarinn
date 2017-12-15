// import dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import modules
import FilterCategory from './FilterCategory';

class FilterList extends Component {
    /**
     * constructor method
     *
     * @since 1.0.0
     * @param {Object} props
     */
    constructor( props ) {
        super( props );
    }

    /**
     * Prepare format of taxonomy names which comes from db for UI
     *
     * @since 1.0.0
     * @param {String}   taxName taxonomy name
     * @return {String}          formatted taxonomy name
     */
    setupTaxonomyName( taxName ) {
        // check if there is underscore in name (use case for task_category)
        const underscoreInName = taxName.indexOf( '_' );
        // if underscore present take just category word out of task_category string
        if ( underscoreInName > 0 ) {
            taxName = taxName.slice( underscoreInName + 1 );
        }
        // make first character of string uppercase
        return taxName.slice( 0, 1 ).toUpperCase().concat( taxName.slice( 1 ) );
    }

    render() {
        const { filters, filtersCollapsed } = this.props;
        return (
            <div className="filter-list">
                { !filtersCollapsed ? Object.keys( filters ).map( ( tax, i ) =>
                    <FilterCategory
                        key={ i }
                        { ...this.props }
                        name={ this.setupTaxonomyName( tax ) }
                        filters={ filters[tax] } />
                ) : null }
            </div>
        );
    }


}

// properties type checking
FilterList.propTypes = {
    filters: PropTypes.object.isRequired,
    tasks: PropTypes.array.isRequired,
    activeFilters: PropTypes.array.isRequired,
    parentFilters: PropTypes.object.isRequired,
    filterChange: PropTypes.func.isRequired,
    toggleParentFilter: PropTypes.func.isRequired
};

export default FilterList;
