import React, {useContext, useEffect ,useState} from 'react';
import  axios  from 'axios';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';


export default function FeaturedProducts() {
  
  const [products,setProducts]=useState ([]);
  let {addToCart, setnumOfCartItems} = useContext(cartContext);

async function addProduct(productId) {
  let response = await addToCart(productId);
  if(response?.data?.status === 'success')
  {
    
    setnumOfCartItems(response.data.numOfCartItems);
    toast.success(response.data.message, {duration:2000})

  }else 
  {
    toast.error('Error', {duration:2000})

  }
  // console.log(response);
}
 async function getProducts() {
    let {data} = await axios.get ('https://ecommerce.routemisr.com/api/v1/products')

  // console.log(data.data);
  setProducts(data.data)
  }
  

  useEffect(()=>{
    getProducts()
  },[])


  return (

    <>
      
<div className='row'>

{products.map((product)=> <div key={product._id} className='col-md-2'>
<div className="product py-4 px-2 cursor-pointer">

  <Link to={`/productDetails/${product._id}`}>
  
  <img src={product.imageCover} alt="imageCover" className='w-100' />
  <span className='text-main fw-bold font-sm'>{product.category.name}</span>
<h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0,2).join(' ')}</h3>

<div className="d-flex justify-content-between">
<span className='text-muted'>{product.price} EGP</span>
<span >
<i className='fas fa-star rating-color '></i>
{product.ratingsAverage}
</span>

</div>

</Link>

<button className='btn bg-main text-white w-100 mt-2' onClick={()=>{addProduct(product._id)}}>+ Add</button>

</div>
</div>
)}
    </div>
    </>
   
  )
}
