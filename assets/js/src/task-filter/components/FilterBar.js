import React from 'react';
import PropTypes from 'prop-types';

function FilterBar( { activeFilters, filtersCollapsed, filterReset, toggleFilters } ) {

    return (

        <div className="filter-bar">
            <div className="filter-bar__title">Sjálfboðaliðastörf</div>
            <div className="filter-bar__buttons">
                <button className={ filtersCollapsed ? 'with-chevron collapsed' : 'with-chevron' } onClick={ toggleFilters }>{ filtersCollapsed ? 'Sýna síu' : 'Fela síu' }</button>

                <button onClick={ filterReset } disabled={ !activeFilters.length }>Hreinsa síu</button>
            </div>
        </div>
    )

}

FilterBar.propTypes = {
    activeFilters: PropTypes.array.isRequired,
    filtersCollapsed: PropTypes.bool.isRequired,
    filterReset: PropTypes.func.isRequired,
    toggleFilters: PropTypes.func.isRequired
};

export default FilterBar;
