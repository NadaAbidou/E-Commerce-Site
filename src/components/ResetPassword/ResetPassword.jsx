import React, { useState } from 'react';
import {useFormik} from 'formik';
import styles from './ResetPassword.module.scss';
import * as Yup from 'yup';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';


export default function ResetPassword() {
 
  let navigate = useNavigate();
  const [isLoading,setIsLoading]=useState(false);
 const [errMessage,setErrMessage]=useState('');

  async function handleResetPassword(values){
    setIsLoading(true)

   let {data}= await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values).catch((err)=>{
    setIsLoading(false);
    setErrMessage (err.response.data.errors.msg);
   
   })

   console.log(data)
  if (data.token)
  {
    setIsLoading(false);
    navigate('/login')
  }

  }

let validation = Yup.object({
  email:Yup.string().required('E-mail is required').email('Invalid e-mail address'),
  newPassword:Yup.string().required('Password is required').matches(/^[A-z][a-z0-9]{5,}$/, 'Invalid Password'),

})

  let formik = useFormik ({
    initialValues:{
      email:'',
      newPassword:'',
    },
    validationSchema:validation,
    onSubmit:handleResetPassword,
   
  });
  return (
    <div className='w-75 mx-auto py-5'>
      <h3 className=' mb-3'>Reset New Password: </h3>

      <div>
      {errMessage.length > 0 ? <div className='alert alert-danger'>{errMessage}</div> : null}
      </div>
      
       <form onSubmit={formik.handleSubmit}>

        <label htmlFor="email">Email: </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' className='form-control my-2' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}


        <label htmlFor="newPassword">newPassword: </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type="password" name='newPassword' id='newPassword' className='form-control my-2' />
        {formik.errors.newPassword && formik.touched.newPassword ? <div className="alert alert-danger">{formik.errors.newPassword}</div> : null}

       <br/>
        {isLoading ?<button type='button' className='text-white btn bg-main my-2'><i className='fas fa-spinner fa-spin'></i></button>: 
        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='text-white btn bg-main my-2'>Submit</button>}

       </form>
    </div>
  )
}
