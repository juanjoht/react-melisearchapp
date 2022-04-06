import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import InputSearch from '../components/InputSearch';
import ListProduct from '../components/ListProduct';
import Product from '../components/Product';

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<InputSearch />} />
            <Route path="/items" element={<ListProduct />} />
            <Route path="/item/:id" element={<Product />} />
        </Routes>
    </BrowserRouter>
  )
}
