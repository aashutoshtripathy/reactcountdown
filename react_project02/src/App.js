import React from 'react';

import Header from './components/Header.js';
import Shop from './components/Shop.js';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import Product from './components/Product.js'
import { CartContextProvider } from './store/Shopping-Cart-Context.js';






function App() {
 


  return (
    <CartContextProvider>
      <Header/>
      <Shop>{DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product}  />
          </li>
        ))}
        </Shop>
    </CartContextProvider>
  );
}

export default App;