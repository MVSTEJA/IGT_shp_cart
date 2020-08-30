import React from "react";
import CategoryListItem from "./CategoryListItem";

export const CategoriesList = ({ categoriesList = [], handleAddToCart }) => {
  return (
    <div className="mx-auto col-md-10 pl-0">
      {categoriesList && categoriesList.length > 0 ? (
        <ul className="d-flex flex-sm-wrap pl-0 mt-5">
          {categoriesList.map((category) => (
            <CategoryListItem
              handleAddToCart={handleAddToCart}
              category={category}
              key={category.id}
            />
          ))}
        </ul>
      ) : (
        <div className="h5 h-100 d-flex justify-content-center align-items-center">
          <p>No items to show.</p>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
