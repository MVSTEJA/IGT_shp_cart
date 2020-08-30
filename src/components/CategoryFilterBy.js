import React from "react";

function CategoriesSortBy({filterByPriceName, handleFilterByPrice}) {
  return (
    <div className="dropdown mr-4">
      <button
        className="btn btn-dark dropdown-toggle"
        type="button"
        id="dropdownMenu2"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {'Filter by price range'}
        {filterByPriceName && (
          <React.Fragment>
            <br />
            <small>({filterByPriceName})</small>
          </React.Fragment>
        )}
      </button>
      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="dropdownMenu2"
        onClick={handleFilterByPrice}
      >
        <button className="dropdown-item" type="button" data-range="$5">
          {'less than $5'}
        </button>
        <button className="dropdown-item" type="button" data-range="$5-$10">
            {'$5 - $10'}
        </button>
        <button className="dropdown-item" type="button" data-range="$10-$15">
            {'$10 - $15'}
        </button>
        <button className="dropdown-item" type="button" data-range="$15-$20">
            {'$15 - $20'}
        </button>
        <button className="dropdown-item" type="button" data-range="$20">
            {'over $20'}
        </button>
      </div>
    </div>
  );
}

export default CategoriesSortBy;
