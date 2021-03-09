import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions';

const getCart = () => {
  const cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(cart);
  }
  return [];
};

const initialState = {
  cart: getCart(),
  total: 0,
  amount: 0,
  shipping: 345,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCard = (product, color) => {
    dispatch({ type: ADD_TO_CART, payload: { product, color } });
  };
  const increase = (id, color) => {
    let newAmount = 0;
    const searchCart = state.cart.find((item) => {
      return item.id === id && item.mainColor === color;
    });
    if (searchCart.amount < searchCart.stock) {
      newAmount = 1;
    }

    addToCard({ ...searchCart, amount: newAmount }, color);
  };
  const decrease = (id, color) => {
    let newAmount = 0;
    const searchCart = state.cart.find((item) => {
      return item.id === id && item.mainColor === color;
    });
    if (searchCart.amount > 1) {
      newAmount = -1;
    }

    addToCard({ ...searchCart, amount: newAmount }, color);
  };
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const removeItem = (id, color) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: { id, color } });
  };
  const countTotal = () => {
    dispatch({ type: COUNT_CART_TOTALS });
  };
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    countTotal();
  }, [state.cart]);
  return (
    <CartContext.Provider
      value={{ ...state, addToCard, increase, decrease, clearCart, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
