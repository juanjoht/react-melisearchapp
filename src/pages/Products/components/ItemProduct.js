import React from 'react'
import { Link } from 'react-router-dom'

const ItemProduct = ({id, title, price, condition,city, thumbnail}) => {
  return (
    <div className="card pt-3 pb-3">
      <div className="row">
        <div className='col-2'>
        <img src={thumbnail} className='itemProduct__thumbnail card-img' alt={title}  /> 
        </div>
        <div className='col-10'>
          <div className='card-body'>
              <h5 className='card-title' >
              $ {Number(price).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </h5>
              <div className='row'>
                <div className='col-10'>
                  <p className='card-text'>{title}</p>
                </div>
                <div className='col-2'>
                  <p className='card-text'>{city}</p>
                </div>
              </div>
              <p className='card-text'>{condition}</p>
              <Link to={`/items/${id}`}>
                Ver más..
              </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemProduct