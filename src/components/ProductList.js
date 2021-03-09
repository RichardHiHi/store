import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { view, filterProducts } = useFilterContext();
  if (filterProducts.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search.
      </h5>
    );
  }
  if (view === 'GRID') {
    return <GridView filterProducts={filterProducts} />;
  }
  return <ListView filterProducts={filterProducts} />;
};

export default ProductList;
