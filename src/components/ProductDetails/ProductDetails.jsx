import React , { useState ,  useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";


export default function ProductDetails() {

 const [productDetails,setProductDetails]= useState(null);
 const [isLoading,setIsLoading]=useState(false);

  let params = useParams ();
  // console.log(params.id);

async  function getProductDetails(id) {
  setIsLoading(true);
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
// console.log(data.data);
setProductDetails(data.data);
setIsLoading(false);
  }

  useEffect(()=>{
    getProductDetails(params.id)
  },[])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
  
    <div className="row align-items-center py-3">
<div className="col-md-4">
  <Slider {...settings}>
{productDetails?.images.map((img,index)=><img key={index}  src={img}/>
)}
  </Slider>
</div>

<div className="col-md-8">
  <h3>{productDetails?.title}</h3>
  <p className='text-muted p-2'>{productDetails?.description}</p>
  <p><span>{productDetails?.category.name}</span></p>
  <p><span>{productDetails?.brand.name}</span></p>
  <div className="d-flex justify-content-between">
<span className='text-muted'>{productDetails?.price} EGP</span>
<span >
<i className='fas fa-star rating-color '></i>
{productDetails?.ratingsAverage}
</span>
</div>
<button className='btn bg-main text-white w-100 my-3'>+ Add to cart</button>

</div>

    </div>
    </>
  )
}
