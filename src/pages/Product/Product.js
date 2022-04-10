import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Categories }  from '../../api/services/Categories';
import { Products }  from '../../api/services/Products';
import { Breadcrumb } from '../../components/Breadcrumb';

function Product() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [product,setProduct] = useState({});
  const [categoriesApi, setCategoriesApi] = useState([]);
  const [productDescription,setProductDescription] = useState({});

 useMemo( ()=> {
   const { getCategoriesById } = Categories();
   const { getProductById,getProductDescription } = Products();
    getProductById(id).then(prod =>{       
      if(Object.keys(prod).length !== 0){
        setProduct(prod);
        getProductDescription(id).then(descr =>{ 
          if (descr){
            setProductDescription(descr);
          }
        });  
        getCategoriesById(prod.categoryId,prod.brand,prod.line).then(cate =>{ 
          if (cate){
            setCategoriesApi(cate);
          }
        });
      }
      else
      {
        navigate('/');
      }
    });
  }, [id]);// eslint-disable-line react-hooks/exhaustive-deps

 

  return (
    <>
    <div className='container product__main'>
     <div className='row breadcrumb__main'>
        <nav style={{'--bs-breadcrumb-divider': '">"'}} aria-label="breadcrumb">
          <div className="breadcrumb mt-3">
          { 
          (categoriesApi.length !== 0) &&
            categoriesApi.map( cate => (
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
    <div className='row  mt-2'>
      <div className='col-8 product__img'>
        <img 
          src={product.picture} 
          alt={product.title}
          className="img-thumbnail product__card"  
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
              $ {Number(product.price).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </h4>
            </li>
            <li className='list-group-item'><button className='btn btn-primary'>Comprar</button></li>
        </ul>
      </div>
    </div>
    <div className='row '>
      <div className='col-12'>
        <div className="card product__card">
            <div className="card-body">
              <h5 className="card-title">Descripción del producto</h5>
              <p className="card-text">{productDescription.text}</p>
            </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Product