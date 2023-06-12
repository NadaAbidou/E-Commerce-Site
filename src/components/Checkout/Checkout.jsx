import React, { useContext } from 'react'
import { useFormik } from 'formik';
import { cartContext } from '../../Context/CartContext';
import {Helmet} from "react-helmet";


export default function Checkout() {

  let {onlinePayment, cartId}= useContext(cartContext);
 
 async function handleSubmit(values){
  let response = await onlinePayment(cartId, values);
if (response?.data?.status === 'success');
// console.log(response?.data?.session?.url);
window.location.href = response?.data?.session?.url;
  // console.log(response );
  }


  let formik = useFormik({
   initialValues:{
    details:'',
    city:'',
    phone:'',
   },
   onSubmit:handleSubmit   
  })


  return (
    <>
      <Helmet>
    <title>Checkout</title>
</Helmet>
<div className='w-50 py-5 mx-auto my-5'>
<form onSubmit={formik.handleSubmit}>
  <label htmlFor="details">Details : </label>
  <input type="text" className='form-control my-2' value={formik.values.details} onChange={formik.handleChange} name='details' id='details' />
  
  <label htmlFor="city">City : </label>
  <input type="text" className='form-control my-2' value={formik.values.city} onChange={formik.handleChange} name='city' id='city' />
  
  <label htmlFor="phone">Phone : </label>
  <input type="tel" className='form-control my-2' value={formik.values.phone} onChange={formik.handleChange} name='phone' id='phone' />

<button type='submit' className='btn border-main w-100 my-2'>Pay</button>
</form>


</div>
    </>
  )
}
