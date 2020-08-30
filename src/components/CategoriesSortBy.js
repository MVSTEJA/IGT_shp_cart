import React from "react";

function CategoriesSortBy({sortByPriceName, handleSortByPrice}) {
  return (
    <div className="dropdown mr-5">
      <button
        className="btn btn-dark dropdown-toggle"
        type="button"
        id="dropdownMenu2"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {'Sort by price'}
        {sortByPriceName && (
          <React.Fragment>
            <br />
            <small>({sortByPriceName})</small>
          </React.Fragment>
        )}
      </button>
      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="dropdownMenu2"
        onClick={handleSortByPrice}
      >
        <button className="dropdown-item" type="button" data-dir="up">
          {'Low to High'}
        </button>
        <button className="dropdown-item" type="button" data-dir="down">
          {'High to Low'}
        </button>
      </div>
    </div>
  );
}

export default CategoriesSortBy;
