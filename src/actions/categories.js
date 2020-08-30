import categories from "../mocks/categories";

export const getAllCategories = () => (dispatch) => {
  dispatch({
    type: "All_CATEGORIES",
    categories,
  });

  dispatch({
    type: "UPDATE_CART_CATEGORIES",
    categories,
  });
};

export const groupByCategory = (groupBy) => ({
  type: "GROUP_BY_CATEGORY",
  groupBy,
});

export const sortByCategory = (sortBy) => ({
  type: "SORT_BY_CATEGORY",
  sortBy,
});

export const filterByCategory = (filterBy) => ({
  type: "FILTER_BY_CATEGORY",
  filterBy,
});
