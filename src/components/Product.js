import React, { useMemo, useState } from 'react'
import NumberFormat from 'react-number-format';
import { useParams } from 'react-router-dom'
import { getCategoriesById } from '../helpers/getCategoriesById';
import { getProductById } from '../helpers/getProductById';
import { getProductDescription } from '../helpers/getProductDescription';
import { Breadcrumb } from './Breadcrumb';

function Product() {
  const {id} = useParams();
  const [product,setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [productDescription,setProductDescription] = useState({});

  useMemo( ()=> {
    getProductById(id).then(prod =>{       
      if(prod){
        setProduct(prod);
        getProductDescription(id).then(descr =>{ 
          if (descr){
            setProductDescription(descr);
          }
        });  
        getCategoriesById(prod.categoryId,prod.brand,prod.line).then(cate =>{ 
          if (cate){
            setCategories(cate);
          }
        });
      }
    });
  }, [id]);

  /*if(Object.keys(product).length === 0){
     return <Navigate to='/'/>
  }*/

  return (
    <>
     <div className='row'>
        <nav style={{'--bs-breadcrumb-divider': '">"'}} aria-label="breadcrumb">
          <div className="breadcrumb">
          { 
          (categories.length !== 0) &&
            categories.map( cate => (
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
    <div className='row mt-2'>
      <div className='col-8'>
        <img 
          src={product.picture} 
          alt={product.title}
          className="img-thumbnail"  
        />
      </div>
      <div className='col-4'>
        <ul className='list-group list-group-flush'>
            <li className='list-group-item'>{ product.condition } - { product.amountSold} Vendidos</li>
            <li className='list-group-item'>
              <h5>
                {product.title}
              </h5>
            </li>
            <li className='list-group-item'>
              <h4>
                <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />    
              </h4>
            </li>
            <li className='list-group-item'><button className='btn btn-primary'>Comprar</button></li>
        </ul>
      </div>
    </div>
    <div className='row'>
      <div className='col-12'>
        <div className="card">
            <div className="card-body">
              <h5 className="card-title">Descripción del producto</h5>
              <p className="card-text">{productDescription.text}</p>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Product