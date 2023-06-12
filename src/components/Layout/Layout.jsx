import React from 'react'
import NavBar from './../NavBar/NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './../Footer/Footer';


export default function Layout({userData, setuserData}) {

  let navigate = useNavigate();

  function logout(){
    localStorage.removeItem('userToken');
    setuserData(null);
    navigate ('/login')
  }

  return (
    <>
    <div className='pt-5'>
    <NavBar logout={logout} userData={userData}/>
    <div className="container">
    <Outlet/>
    </div>
    </div>
  
    </>
  )
}
