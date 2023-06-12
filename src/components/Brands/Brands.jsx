import React from 'react'
import {Helmet} from "react-helmet";
import { useApi } from '../../Hooks/useApi';
import{useDispatch, useSelector} from 'react-redux';
import { decrease, increamentByAmount, increase } from '../../Redux/CounterSlice';



export default function Brands() {
 let {dataList} = useApi(`https://ecommerce.routemisr.com/api/v1/brands`);
 
 

// let {counter,products} = useSelector((state)=>state.counter

// )

// let dispatch = useDispatch();

  return (
    <>

    {/* <p>Counter : {counter}</p>

    <div>

      <button onClick={()=>dispatch(increase())} className='btn btn-success mx-3'>+</button>
      <button onClick={()=>dispatch(decrease())} className='btn btn-danger mx-3'>-</button>
      <button onClick={()=>dispatch(increamentByAmount(10))} className='btn btn-danger'>increament By Amount</button>
    </div> */}

    
        <Helmet>
    <title>Brands Details</title>
</Helmet>

    <div className='container'>
      <div className="row">
        {dataList.map((brand)=>{
          return <div key={brand._id} className="col-md-2">
            <img src={brand.image} alt="" className='w-100 gy-3'/>
          </div>
        })}
      </div>

    </div>
    </>

  )
}
