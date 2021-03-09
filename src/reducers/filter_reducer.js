import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  let maxPrice = 0;

  if (action.type === LOAD_PRODUCTS) {
    const priceArray = action.payload.map((product) => {
      return product.price;
    });
    maxPrice = Math.max(...priceArray);
    return {
      ...state,
      filterProducts: action.payload,
      products: action.payload,
      filterValue: {
        ...state.filterValue,
        maxPrice: maxPrice,
        price: maxPrice,
      },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, view: 'GRID' };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, view: 'LIST' };
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sortOption: action.payload,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    let sortedProducts = [...state.filterProducts];

    switch (state.sortOption) {
      case 'price-lowest':
        console.log(state.sortOption);
        sortedProducts = state.filterProducts.sort((a, b) => {
          return a.price - b.price;
        });
        break;
      case 'price-highest':
        sortedProducts = state.filterProducts.sort((a, b) => {
          return b.price - a.price;
        });
        break;
      case 'name-a':
        sortedProducts = state.filterProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      case 'name-z':
        sortedProducts = state.filterProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        break;
    }

    return { ...state, filterProducts: sortedProducts };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      filterValue: { ...state.filterValue, [name]: value },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    const {
      text,
      category,
      colors,
      shipping,
      price,
      company,
    } = state.filterValue;
    let newProduct = [...state.products];
    if (text) {
      newProduct = newProduct.filter((product) => {
        return product.name.substring(0, text.length) === text;
      });
    }
    if (category !== 'ALL') {
      newProduct = newProduct.filter((product) => {
        return product.category === category;
      });
    }
    if (company !== 'ALL') {
      newProduct = newProduct.filter((product) => {
        return product.company === company;
      });
    }
    if (colors !== 'ALL') {
      const newProducts = newProduct.filter((product) => {
        return product.colors.some((item) => item === colors);
      });
      newProduct = [...new Set(newProducts)];
    }
    if (shipping) {
      newProduct = newProduct.filter((product) => {
        return product.shipping;
      });
    }

    newProduct = newProduct.filter((product) => {
      return product.price < price;
    });

    return { ...state, filterProducts: newProduct };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filterProducts: [...state.products],
      filterValue: {
        ...state.filterValue,
        text: '',
        company: 'ALL',
        category: 'ALL',
        colors: 'ALL',
        shipping: false,
        price: state.filterValue.maxPrice,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
