import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  if (action.type === COUNT_CART_TOTALS) {
    const { amount, subtotal } = state.cart.reduce(
      (acc, item) => {
        acc.amount += item.amount;
        acc.subtotal += item.amount * item.price;
        return acc;
      },
      {
        amount: 0,
        subtotal: 0,
      }
    );
    return { ...state, amount: amount, total: subtotal };
  }
  if (action.type === ADD_TO_CART) {
    const id = action.payload.product.id;
    const color = action.payload.color;
    let flag = false;
    let newProduct = [];
    const product = state.cart;
    for (let i = 0; i < product.length; i++) {
      if (product[i].id === id && product[i].mainColor === color) {
        flag = true;
        break;
      }
    }
    if (flag) {
      newProduct = state.cart.map((product) => {
        if (product.id === id && product.mainColor === color) {
          let newAmount = product.amount + action.payload.product.amount;
          if (newAmount > product.stock) {
            newAmount = product.stock;
          }
          return {
            ...product,
            amount: newAmount,
          };
        }
        return product;
      });
    } else {
      newProduct = state.cart.concat(action.payload.product);
    }

    return { ...state, cart: newProduct };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [], total: 0, amount: 0, shipping: 345 };
  }
  if (action.type === REMOVE_CART_ITEM) {
    const id = action.payload.id;

    const color = action.payload.color;

    const newCart = state.cart.filter((item) => {
      return item.id !== id && item.color !== color;
    });
    return { ...state, cart: newCart };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
