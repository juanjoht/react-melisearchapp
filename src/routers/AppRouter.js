import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Product from '../pages/Product/Product';
import ListProduct from '../pages/Products/ListProduct';
import InputSearch from '../pages/Search/InputSearch';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <InputSearch />
      <Routes>
        <Route path="/" element={<ListProduct />} />
        <Route path="/items" element={<ListProduct />} />
        <Route path="/items/:id" element={<Product />} /> 
      </Routes>
    </BrowserRouter>
  )
}
