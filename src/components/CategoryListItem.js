import React from "react";

export const CategoryListItem = ({ category = {}, handleAddToCart }) => {
  return (
    <div
      className="card mx-5 mb-5 w-25"
    >
      <img className="card-img-top" src={category.image} alt="Card cap" />
      <div className="card-body">
        <p className="card-text">Name: {category.name}</p>
        <p className="card-text">Price: {category.price}</p>
        <button
          type="button"
          className="btn btn-dark btn-default"
          onClick={() => {
            handleAddToCart(category);
          }}
          disabled={category.disabled}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default CategoryListItem;
