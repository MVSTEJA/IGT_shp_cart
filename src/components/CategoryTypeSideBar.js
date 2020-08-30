import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { groupByCategory } from "../actions/categories";

function CategoryTypeSideBar() {
  let { cartCategories } = useSelector((state) => state.cartHash);
  let dispatch = useDispatch();

  let [currentActiveCategory, setCurrentActiveCategory] = useState(null);

  let handleGroupByCategory = (evt) => {
    let { textContent } = evt.target;
    dispatch(groupByCategory(textContent));
    setCurrentActiveCategory(textContent);
  };

  useEffect(() => {
    cartCategories && setCurrentActiveCategory(cartCategories[0]);
  }, [cartCategories, setCurrentActiveCategory]);
  return (
    <div className="side-bar col-md-2 position-sticky pr-0 pl-5">
      <ul className="list-group">
        {cartCategories &&
          cartCategories.map((cat) => (
            <li
              key={cat}
              className={`list-group-item list-group-item-action list-group-item-secondary ${
                currentActiveCategory === cat && "active"
              }`}
              onClick={handleGroupByCategory}
            >
              {cat}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CategoryTypeSideBar;
