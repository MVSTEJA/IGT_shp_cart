import { getAllCategories } from "./categories";

export const addToCart = (cartItem) => (dispatch) => {
  dispatch({
    type: "ADD_TO_CART",
    cartItem,
  });

  dispatch({
    type: "DISABLE_CATEGORY_SUBITEM",
    cartItem,
  });
};

export const incrementCart = (subItemId, categoryName) => ({
  type: "INCREMENT_CART_SUBITEM",
  subItemId,
  categoryName,
});

export const decrementCart = (subItemId, categoryName) => ({
  type: "DECREMENT_CART_SUBITEM",
  subItemId,
  categoryName,
});

export const resetCart = () => (dispatch) => {
  dispatch({
    type: "RESET_CART",
  });

  dispatch(getAllCategories());
};
