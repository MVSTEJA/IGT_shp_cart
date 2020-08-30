const INITIAL_STATE = {
  cart: {},
  cartCount: 0,
};

const buildRecieptsLists = (cartCopy) => {
  let reciepts = [];
  Object.keys(cartCopy).forEach((cartName) => {
    let totalprice = 0;
    reciepts.push({
      totalItemsLength: cartCopy[cartName].length,
      categoryName: cartName,
      totalItems: cartCopy[cartName].reduce((sum, acc) => {
        if (!totalprice) {
          totalprice = 0;
        }
        if (!sum[acc.name]) {
          sum[acc.name] = {
            price: 0,
            length: 0,
            id: null,
          };
        }
        let subItem = sum[acc.name];
        subItem.price += acc.price;
        subItem.length += 1;
        subItem.id = acc.id;
        totalprice += acc.price;

        return sum;
      }, {}),
      totalprice,
    });
  });
  return reciepts;
};

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * 
 * @description
 * 
 * Primary requirements handled are, 
 * 1. User should be able to select a particular product, add it to shopping cart.
 * 2. User should be able to check out the cart once they are done with the selection of products.
 * 3. Checking out the cart would display all the products, category, price in the cart along with the total amount in a soft popup.
 * 
 * Below secondary requirement is handled here.
 * 1. User should be able to edit or delete items from the cart.
 */
const cart = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let { cartItem } = action;
      let { cart } = state;

      let cartCopy = { ...cart };
      if (!cartCopy[cartItem.category]) {
        cartCopy[cartItem.category] = [];
      }
      cartCopy[cartItem.category] = [...cartCopy[cartItem.category], cartItem];

      let reciepts = buildRecieptsLists(cartCopy);

      return {
        ...state,
        cart: cartCopy,
        cartCount: state.cartCount + 1,
        reciepts,
      };
    case "UPDATE_CART_CATEGORIES": {
      let { categories } = action;
      return {
        ...state,
        cartCategories: [
          "All",
          ...new Set(categories.map((cat) => cat.category)),
        ],
      };
    }

    case "INCREMENT_CART_SUBITEM": {
      let { subItemId, categoryName } = action;
      let { cart } = state;

      let cartCopy = { ...cart };

      let subItems = cartCopy[categoryName];
      cartCopy[categoryName] = [
        ...subItems,
        subItems.find((subItem) => subItem.id === subItemId),
      ];

      let reciepts = buildRecieptsLists(cartCopy);
      return {
        ...state,
        cart: cartCopy,
        cartCount: state.cartCount + 1,
        reciepts,
      };
    }

    case "DECREMENT_CART_SUBITEM": {
      let { categoryName, subItemId } = action;
      let { cart } = state;

      let cartCopy = { ...cart };

      //Finding index of sub-item to remove. 
      let removeIndex = cartCopy[categoryName]
        .map((subItem) => subItem.id)
        .indexOf(subItemId);

      let subItems = cartCopy[categoryName].slice().splice(removeIndex, 1);

      cartCopy[categoryName] = subItems;

      let reciepts = buildRecieptsLists(cartCopy);

      return {
        ...state,
        cart: cartCopy,
        cartCount: state.cartCount - 1,
        reciepts,
      };
    }

    case "RESET_CART": {
      return {
        ...state,
        cart: {},
        cartCount: 0,
        reciepts: [],
      };
    }

    default:
      return state;
  }
};

export default cart;
