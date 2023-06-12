import React, { useState } from 'react';
import {useFormik} from 'formik';
import styles from './ResetCode.module.scss';
import * as Yup from 'yup';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';


export default function ResetCode() {
  const [isLoading,setIsLoading]=useState(false);
  const [errMessage,setErrMessage]=useState('');
  let navigate = useNavigate();

  async function resetPassword(val){
    setIsLoading(true)
let data= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',val).catch((err)=>{
  setIsLoading(false);
setErrMessage(err.response.data.message)
// console.log(err);
})
        
          if(data?.data?.status === 'Success'){
            navigate('/reset-password')
          }
    
  }

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string().required('Reset Code is required'),
  });

  let formik = useFormik ({
    initialValues:{
      resetCode:'',
    },
    validationSchema,
    onSubmit:(values)=>{
      resetPassword(values);
    }
   
  });


  return (
    <div  className='w-75 mx-auto py-5'>
      
       <form onSubmit={formik.handleSubmit}>
  
  <label htmlFor="resetCode">Reset Code: </label>
  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} type="text" name='resetCode' id='resetCode' className='form-control my-2' />
  {formik.errors.resetCode && formik.touched.resetCode ? <div className="alert alert-danger">{formik.errors.resetCode}</div> : null}

{errMessage !==''? <div className='alert alert-danger'>{errMessage}</div>:null}

  {isLoading ?<button type='button' className='text-white btn bg-main my-2'><i className='fas fa-spinner fa-spin'></i></button>: 
  <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='text-white btn bg-main my-2'>Verify Code</button>}

 </form>

    </div>
  )
}
