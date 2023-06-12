import React from 'react'
import Slider from "react-slick";
import slide1 from '../../assets/images/grocery-banner.png';
import slide2 from '../../assets/images/grocery-banner-2.jpeg';
import slide3 from '../../assets/images/slider-2.jpeg';



export default function Header() {
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  
      
  };

  return (
    <>
    <div className="my-3">
    <Slider {...settings}>
<img src={slide1} alt="slide1" />
<img src={slide2} alt="slide2" />
<img src={slide3} alt="slide3" />
  </Slider> 

    </div>

    </>

  )
}
