import React from 'react'
import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom'

const ItemProduct = ({id, title, price, condition,city, thumbnail}) => {
  return (
    <div className="card">
      <div className="row">
        <div className='col-4'>
        <img src={thumbnail} className='card-img' alt={title} width='90' height='90' /> 
        </div>
        <div className='col-8'>
          <div className='card-body'>
              <h5 className='card-title' >
                <NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              </h5>
              <p className='card-text'>{title}</p>
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