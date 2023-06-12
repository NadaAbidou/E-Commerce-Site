import React from 'react';
import notFoundImg from '../../assets/images/error.svg'

export default function NotFound() {
  return (
    <div className='text-center py-5'>
    <img src={notFoundImg} alt="notFoundImg"/>
    </div>
  )
}
