import React from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'

import { useFetchProducts } from '../hooks/useFetchProducts';
import { Breadcrumb } from './Breadcrumb';
import ItemProduct from './ItemProduct';

 const ListProduct = () => {
  const location = useLocation();
  const {search = ''} = queryString.parse(location.search);

  const {data: products} = useFetchProducts(search);
  console.log(search);
  console.log([...products])

  return (
      <>
        <div className='row'>
        <nav style={{'--bs-breadcrumb-divider': '">"'}} aria-label="breadcrumb">
          <div className="breadcrumb">
          { 
          (products.length !== 0) &&
          (products.categories.length !== 0) &&
            products.categories.map( cate => (
                <Breadcrumb
                  key={cate.id}
                  {...cate} 
                />
              )
              )
          }
           </div>
          </nav>
        </div>
        <div className='row'>
        {
          (search === '')
            ? <div className='alert alert-info mt-2'>Digita un criterio de búsqueda</div>
            : ( products.length === 0)
            ? <div className='alert alert-danger mt-2'>No se encontraron resultados asociados a: {search}</div>
            : products.map(prod=> (
              <ItemProduct 
                       key={prod.id}
                       {...prod}
               />
             )
             )
        }
        </div>
      </>
  )
}

export default ListProduct;
