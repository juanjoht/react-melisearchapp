import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import InputSearch from '../components/InputSearch';
import Product from '../components/Product';

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<InputSearch />} />
            <Route path="/items" element={<InputSearch />} />
            <Route path="/items/:id" element={<Product />} />
        </Routes>
    </BrowserRouter>
  )
}
