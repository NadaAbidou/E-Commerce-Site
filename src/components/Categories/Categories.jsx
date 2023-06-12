import React, {useEffect, useState}  from 'react';
import axios from "axios";
import Slider from "react-slick";
import {Helmet} from "react-helmet";




export default function Categories() {

const [allCategories, setAllCategories] = useState([])

 async function  getAllCategories() {
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  
    setAllCategories(data.data)

    // console.log(data);
  }
  
  useEffect (()=>{
    getAllCategories()
  },[])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed:1500,
   
  };

  return (
    <>
    
<div className='row'>
  <Slider {...settings}>
{allCategories.map((cat)=>{
  return <div key={cat._id} className="col-md-3">
    <img src={cat.image} className='w-100' height={200} alt='cat'/>
 <h2 className='h6 pt-2'>{cat.name}</h2>
  </div>
})}
  </Slider> 
    </div>
    </>

  )
}
