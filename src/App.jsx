import './App.css';
import {RouterProvider, createBrowserRouter, createHashRouter} from 'react-router-dom';
import { Offline, Online } from "react-detect-offline";
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import Brands from './components/Brands/Brands';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ResetCode from './components/ResetCode/ResetCode';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Categories from './components/Categories/Categories';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import { Provider } from 'react-redux';
import { Store } from './Redux/Store';


function App() {

  useEffect (()=>{
    if(localStorage.getItem('userToken') !== null){
    saveUserData()
    }
    },[])

  const [userData,setuserData]= useState(null);

  function saveUserData() {
    let encodedToken=localStorage.getItem('userToken');
    let decodedToken= jwtDecode(encodedToken);
    // console.log(decodedToken);
    setuserData(decodedToken)
  }

  const Routers = createHashRouter([
    {path:'',element:<Layout setuserData={setuserData} userData={userData}/>,children:[
      {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'checkout',element:<ProtectedRoute><Checkout/></ProtectedRoute>},
      {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'productDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'forgot-password',element:<ForgotPassword/>},
      {path:'reset-password',element:<ResetPassword/>},
      {path:'reset-code',element:<ResetCode/>},
      {path:'login',element:<Login saveUserData={saveUserData} />},
      {path:'register',element:<Register/>},
      {path:'*',element:<NotFound/>},
    ]},
    
  
  ])
  return (
    <>
<Provider store={Store}>
<CartContextProvider>
    <Online>Only shown when you're online</Online>
    <Offline> <div className='network'>Only shown offline (surprise!)</div> </Offline>
      <Toaster/>
    <RouterProvider router= {Routers}></RouterProvider>
    </CartContextProvider>
</Provider>
    
  
    </>
  );
}

export default App;
