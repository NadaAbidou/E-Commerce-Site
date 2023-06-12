import React from 'react'
import Header from '../Header/Header'
import Categories from './../Categories/Categories';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import { Helmet } from 'react-helmet';


export default function Home() {
  return (
    <>
    <Helmet>
    <title>Home</title>
</Helmet>
    <Header/>
    <div className="container pb-5">
    <h3 className='my-5'>Shop Popular Categories</h3>
   <Categories/>
   </div>
    <FeaturedProducts/>
  
    </>
  )
}
 