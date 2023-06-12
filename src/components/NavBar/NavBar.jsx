import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg'
import { cartContext } from '../../Context/CartContext';


export default function NavBar({ userData, logout }) {


  let { numOfCartItems } = useContext(cartContext);



  return (
    <>
      <nav className="fixed-top bg-main-light navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {userData !== null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="products">Products</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="categories">Categories</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="brands">Brands</Link>
              </li>


            </ul> : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">

              <li className="nav-item d-flex align-items-center">

                <a target="_blank" href="https://www.instagram.com/nada_abidou/?igshid=MzNlNGNkZWQ4Mg%3D%3D">
                  <i className="fab mx-2 fa-instagram"></i>
                </a>

                <a target="_blank" href="https://www.facebook.com/noody.youssef.93">
                  <i className="fab mx-2 fa-facebook"></i>
                </a>

                <a target="_blank" href="https://www.tiktok.com/en/">
                  <i className='fab mx-2 fa-tiktok'></i>
                </a>

                <a target="_blank" href="https://twitter.com/nadousha_nada?t=aT9eakh9KOBCz-U753CZpA&s=09">
                  <i className="fab mx-2 fa-twitter"></i>
                </a>

                <a target="_blank" href=" https://www.linkedin.com/in/nada-abidou-a30346275">
                  <i className="fab mx-2 fa-linkedin"></i>
                </a>

                <a target="_blank" href="https://youtube.com">
                  <i className=""></i>
                </a>
              </li>

              {userData === null ? <>
                <li className="nav-item">
                  <Link className="nav-link" to="login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="register">Register</Link>
                </li>
              </>
                :

                <>

                  <li className="nav-item position-relative">
                    <Link className="nav-link px-2" to="cart">
                      <i className='fas fa-shopping-cart fa-lg'></i>
                      <span className='badge position-absolute top-0 end-0  bg-main text-white'>{numOfCartItems}</span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <span className="nav-link cursor-pointer" onClick={logout}>Logout</span>
                  </li>

                </>

              }
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}
