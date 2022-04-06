import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { useForm } from '../hooks/useForm'
import ItemProduct from './ItemProduct';
import { useFetchProducts } from '../hooks/useFetchProducts';

const InputSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {q = ''} = queryString.parse(location.search);
  const [ formValues, handleInputChange ] = useForm({
    searchText : q
  });
  const {searchText} = formValues;


  const {data: products, isLoading} = useFetchProducts(q);
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    navigate(`?q=${searchText}`);
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
        { isLoading && <p>Loading...</p>}
        {
          (q === '')
            ? <div className='alert alert-info mt-2'>Digita un criterio de búsqueda</div>
            : ( products.length === 0)
              && <div className='alert alert-danger mt-2'>No se encontraron resultados asociados a: {q}</div>
        }
        {
            products.map(prod=> (
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