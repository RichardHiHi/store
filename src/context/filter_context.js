import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './products_context';

const initialState = {
  filterProducts: [],
  products: [],
  view: 'GRID',
  sortOption: '',
  filterValue: {
    text: '',
    company: 'ALL',
    category: 'ALL',
    colors: 'ALL',
    shipping: false,
    minPrice: 0,
    maxPrice: 0,
    price: 0,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const changeView = (value) => {
    if (value === 'GRID' && state.view === 'LIST') {
      dispatch({ type: SET_GRIDVIEW });
    }
    if (value === 'LIST' && state.view === 'GRID') {
      dispatch({ type: SET_LISTVIEW });
    }
  };
  const handleSortChange = (e) => {
    const option = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: option });
  };
  const handleFilterChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'category') {
      value = e.target.textContent;
    }
    if (name === 'shipping') {
      value = e.target.checked;
    }
    if (name === 'colors') {
      value = e.target.getAttribute('data-color');
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);
  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
  }, [state.sortOption, products]);
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
  }, [state.filterValue]);
  return (
    <FilterContext.Provider
      value={{
        ...state,
        changeView,
        handleSortChange,
        handleFilterChange,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
