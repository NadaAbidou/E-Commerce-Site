import React, { useState } from 'react';
import { useFormik } from 'formik';
import styles from './Login.module.scss';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function Login({ saveUserData }) {

  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  async function handleLogin(values) {
    setIsLoading(true)

    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err) => {
      setIsLoading(false);
      setErrMessage(err.response?.data?.message);
      console.log(data)


    })

    if (data.message === 'success') {
      localStorage.setItem('userToken', data.token)
      saveUserData()
      navigate('/')
    }

  }

  let validation = Yup.object({
    email: Yup.string().required('E-mail is required').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,4}$/i, 'Invalid e-mail address'),
    // email('Invalid e-mail address'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{7,}$/, 'Password must start with a Capital letter and at least 8 character'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validation,
    onSubmit: handleLogin,

  });
  return (
    <div className='w-75 mx-auto py-5'>
      <h3 className='text-center mb-3'>Login Now : </h3>

      <div>
        {errMessage.length > 0 ? <div className='alert alert-danger'>{errMessage}</div> : null}
      </div>

      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="email">Email: </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' className='form-control my-2' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}


        <label htmlFor="password">Password: </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' className='form-control my-2' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}

        <Link className='text-main' to={'/forgot-password'}>Forgot Your Password?</Link>
        <br />
        {isLoading ? <button type='button' className='text-white btn bg-main my-2'><i className='fas fa-spinner fa-spin'></i></button> :
          <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='text-white btn bg-main my-2'>Submit</button>}

      </form>
    </div>
  )
}
