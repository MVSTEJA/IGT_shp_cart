import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sortByCategory, filterByCategory } from "../actions/categories";
import CategoriesSortBy from "./CategoriesSortBy";
import CategoryFilterBy from "./CategoryFilterBy";

import Checkout from "./Checkout";

const NavBar = () => {
  let dispatch = useDispatch();

  let [sortByPriceName, setSortByPriceName] = useState(null);
  let [filterByPriceName, setFilterByPriceName] = useState(null);

  const handleSortByPrice = (evt) => {
    let { dataset, textContent } = evt.target;

    dispatch(sortByCategory(dataset.dir));

    setSortByPriceName(textContent);
  };

  const handleFilterByPrice = (evt) => {
    let { dataset, textContent } = evt.target;

    dispatch(filterByCategory(dataset.range));

    setFilterByPriceName(textContent);
  };
  return (
    <nav className="nav mt-4 px-5 nav-tabs align-items-center position-sticky app-nav-bar" >
      <li className="nav-item">
        <h3 className="mb-0">
          <button
            className="nav-link active"
            data-nav-path="categories"
            style={{
              height: "70px",
            }}
          >
            Categories
          </button>{" "}
        </h3>
      </li>
      <li
        className="d-flex justify-content-end"
        style={{
          flex: 1,
        }}
      >
        <div className="d-flex justify-content-end">
          <CategoryFilterBy
            filterByPriceName={filterByPriceName}
            handleFilterByPrice={handleFilterByPrice}
          />
          <CategoriesSortBy
            sortByPriceName={sortByPriceName}
            handleSortByPrice={handleSortByPrice}
          />
        </div>
        <Checkout />
      </li>
    </nav>
  );
};

export default NavBar;
