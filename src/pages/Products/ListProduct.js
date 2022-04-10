import React from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { useFetchProducts } from '../../hooks/useFetchProducts';
import { Breadcrumb } from '../../components/Breadcrumb';
import ItemProduct from './components/ItemProduct';

 const ListProduct = () => {
  const location = useLocation();
  const {search = ''} = queryString.parse(location.search);
  const {data: products} = useFetchProducts(search);

  return (
      <>
      <div className='container'>
        <div className='row breadcrumb__main'>
        <nav style={{'--bs-breadcrumb-divider': '">"'}} className="mt-3" aria-label="breadcrumb">
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
            ? <div className='alert alert-info mt-2'>Digite un criterio de búsqueda</div>
            : ( products.length !== 0)
            ? products.map(prod=> (
              <ItemProduct 
                       key={prod.id}
                       {...prod}
               />
             )
             )
             :
              <div className='alert alert-danger mt-2'>No se encontraron resultados asociados a:<span className='listProduct__no-found'> {search} </span> </div>
        }
        </div>
        </div>
      </>
  )
}

export default ListProduct;
