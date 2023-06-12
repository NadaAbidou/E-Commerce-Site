import React from 'react'
import { useApi } from '../../Hooks/useApi'

export default function Products() {
  
  let {dataList} = useApi (`https://ecommerce.routemisr.com/api/v1/products`)
  
  return (
    <div className='container'>
      <div className="row">
        {dataList.map((product)=>{
          return <div key={product._id} className="col-md-2 gy-4">
  <img src={product.imageCover} alt="imageCover" className=' w-100' />
<h3 className='h6 fw-bolder my-3'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
          </div>
        })}
      </div>


    </div>
  )
}
