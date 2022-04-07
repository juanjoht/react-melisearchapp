import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { useForm } from '../hooks/useForm'
import ItemProduct from './ItemProduct';
import { useFetchProducts } from '../hooks/useFetchProducts';

const InputSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {search = ''} = queryString.parse(location.search);
  const [ formValues, handleInputChange ] = useForm({
    searchText : search
  });
  const {searchText} = formValues;
  const {data: products, isLoading} = useFetchProducts(search);
  console.log(products);
  const handleSubmit = (e) =>{
    e.preventDefault();
    navigate(`?search=${searchText}`);
    console.log(searchText);
  }

  return (
    <>
      <div className='row'>
      <form onSubmit={ handleSubmit }>
        <div className='col-10'>
          <input
            type="text"
            value={searchText}
            name="searchText"
            className='form-control'
            onChange={handleInputChange}
            autoComplete="off"
         />
        </div>
        <div className='col-2'>
          <button
                className='btn btn-outline-primary'
                type='submit'>
                  Buscar
          </button>
        </div>
        </form>
        </div>
        <div className='row'>
        <nav style={{'--bs-breadcrumb-divider': '">"'}} aria-label="breadcrumb">
          <ol className="breadcrumb">
          { 
          (products.length !== 0) &&
          (products.categories.length !== 0) &&
            products.categories.map( cate => (
                <li 
                  className='breadcrumb-item active'
                  aria-current="page"
                  key={cate.id}>
                  {cate.name}
                </li>  
              )
              )
          }
           </ol>
          </nav>
        </div>
        <div className='row'>
        { isLoading && <p>Loading...</p>}
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

export default InputSearch;