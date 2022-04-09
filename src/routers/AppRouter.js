import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import InputSearch from '../components/InputSearch';
import ListProduct from '../components/ListProduct';
import Product from '../components/Product';

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
