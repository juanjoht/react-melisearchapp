import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { useForm } from '../hooks/useForm'

const InputSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {search = ''} = queryString.parse(location.search);
  const [ formValues, handleInputChange ] = useForm({
    searchText : search
  });
  const {searchText} = formValues;
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(location)
    navigate(`/items?search=${searchText}`,{ replace: true });
  }

  return (
    <>
    <nav className="navbar navbar-dark bg-dark">
      <form className='container-fluid' onSubmit={ handleSubmit }>
          <div className='input-group'>
              <input
                type="text"
                value={searchText}
                name="searchText"
                className='form-control'
                onChange={handleInputChange}
                autoComplete="off"
            />
            <button type='submit' className="input-group-text" id="basic-addon1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </div>
       </form>
     </nav>
     
      </>
  )
}

export default InputSearch;