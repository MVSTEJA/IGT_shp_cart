const INITIAL_STATE = {
  categories: [],
  displayCategories: [],
};

const rangeMap = {
  $5: [0, 5],
  "$5-$10": [5, 10],
  "$10-$15": [10, 15],
  "$15-$20": [15, 20],
  $20: [20, Number.MAX_VALUE],
};

const filterByHandler = (displayCategories, filterBy) => {
  if (filterBy) {
    return displayCategories.filter((cat) => {
      let [low, high] = rangeMap[filterBy];
      return cat.price >= low && cat.price < high;
    });
  }
  return displayCategories;
};

const sortByHandler = (displayCategories, sortBy) => {
  if (sortBy) {
    return displayCategories.slice().sort((cat1, cat2) => {
      if (sortBy === "up") {
        return cat1.price - cat2.price;
      }
      return cat2.price - cat1.price;
    });
  }
  return displayCategories;
};

const groupByHandler = (displayCategories, groupBy) => {
  if (groupBy !== "All" && groupBy) {
    return displayCategories.filter((cat) => cat.category === groupBy);
  }

  return displayCategories;
};

const allFilterHandler = (displayCategories, groupBy, sortBy, filterBy) => {
  displayCategories = groupByHandler(displayCategories, groupBy);
  displayCategories = sortByHandler(displayCategories, sortBy);
  displayCategories = filterByHandler(displayCategories, filterBy);

  return displayCategories;
};

const disableItemHandler = (categories, cartItem) => {
  return categories.map((item) => {
    let mapItem = { ...item };
    if (mapItem.id === cartItem.id) {
      mapItem.disabled = true;
    }
    return mapItem;
  });
};

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @description 
 * 
 * Primary requirements handled are,
 * 1. User should be able to view all items under a category. 
 * 
 * Below 2 secondary requirements as well handled here.
 * 1. User should be able to filter items by categories, price range e.g (less than $5, $5 - $10,
    $10 - $15, $15 - $20, over $20). 
 * 2. User should be able to sort items by price range e.g High to Low, Low to High
 *  
 */
const categories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "All_CATEGORIES": {
      return {
        ...state,
        categories: action.categories,
        displayCategories: action.categories,
      };
    }
    case "GROUP_BY_CATEGORY": {
      let { categories, sortBy, filterBy } = state;
      let { groupBy } = action;
      let displayCategories = [...categories];

      displayCategories = allFilterHandler(
        displayCategories,
        groupBy,
        sortBy,
        filterBy
      );
      return {
        ...state,
        groupBy,
        displayCategories,
      };
    }

    case "SORT_BY_CATEGORY": {
      let { groupBy, filterBy, categories } = state;
      let { sortBy } = action;
      let displayCategories = [...categories];

      displayCategories = allFilterHandler(
        displayCategories,
        groupBy,
        sortBy,
        filterBy
      );

      return {
        ...state,
        displayCategories,
        sortBy,
      };
    }

    case "FILTER_BY_CATEGORY": {
      let { categories, sortBy, groupBy } = state;
      let { filterBy } = action;
      let displayCategories = [...categories];

      displayCategories = allFilterHandler(
        displayCategories,
        groupBy,
        sortBy,
        filterBy
      );

      return {
        ...state,
        displayCategories,
        filterBy,
      };
    }

    case "DISABLE_CATEGORY_SUBITEM": {
      let { categories, displayCategories } = state;
      let { cartItem } = action;

      categories = disableItemHandler(categories, cartItem);
      displayCategories = disableItemHandler(displayCategories, cartItem);

      return {
        ...state,
        categories,
        displayCategories,
      };
    }

    default:
      return state;
  }
};

export default categories;
