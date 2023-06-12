import React, { useState } from 'react';
import {useFormik} from 'formik';
import styles from './ForgotPassword.module.scss';
import * as Yup from 'yup';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';


export default function ForgotPassword() {
  let navigate = useNavigate()
  const [isLoading,setIsLoading]=useState(false);

  let validation = Yup.object({
    email:Yup.string().required('E-mail is required').email('Invalid e-mail address'),
  
  })
  
async function forgotPassword(values){
  setIsLoading(true)
  let {data}= await axios.post ('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values)
  setIsLoading(false);
  console.log(data);

  if (data.statusMsg==='success')
{
  navigate('/reset-code')
}

}

    let formik = useFormik ({
      initialValues:{
        email:'',
      },

      validationSchema:validation,
      onSubmit:(values)=>{
        forgotPassword(values)
      }
     
    });

  
    return (
      <div className='w-75 mx-auto py-5'>
        
         <form onSubmit={formik.handleSubmit}>
  
          <label htmlFor="email">Email: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' className='form-control my-2' />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}
  
          {isLoading ?<button type='button' className='text-white btn bg-main my-2'><i className='fas fa-spinner fa-spin'></i></button>: 
          <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='text-white btn bg-main my-2'>Send</button>}
  
         </form>


     
      </div>
    )
  }

