import React from 'react'

export  const Breadcrumb = ({id,name}) => {
  return (
        <div 
            className='breadcrumb-item active'
            aria-current="page"
            key={id}>
            {name}
        </div>  
  )
}
