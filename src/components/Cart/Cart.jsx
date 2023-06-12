import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";


export default function Cart() {

  const [cartDetails, setCartDetails] = useState(null)
  let { getLoggedUserCart, removeItem, updateProductCount, setnumOfCartItems } = useContext(cartContext);

  async function getCart() {
    let response = await getLoggedUserCart()
    // console.log(respone);
    if (response?.data?.status === 'success') {
      setCartDetails(response?.data?.data)
    }

  }


  async function deleteItem(productId) {
    let response = await removeItem(productId);
    setCartDetails(response?.data?.data);
    toast.success('Product Successfully Removed', { duration: 2000 })
    // console.log(response);
    setnumOfCartItems(response?.data?.numOfCartItems)
  }


  async function updateProductQuantity(productId, count) {
    let response = await updateProductCount(productId, count);
    setCartDetails(response?.data?.data);
    toast.success('Product Count Successfully Updated', { duration: 2000 })
    // console.log(response);
    setnumOfCartItems(response?.data?.numOfCartItems)
  }


  useEffect(() => {
    getCart();
  }, [])


  return <>
    <Helmet>
      <title>Cart Details</title>
    </Helmet>
    {cartDetails !== null ? <div className='container'>
      <div className="bg-main-light p-4 my-4">
        <h5 className='fw-bolder'>Shop Cart :</h5>
        <h6 className='text-main'>Total Cart Price : {cartDetails?.totalCartPrice} EGP</h6>
        {cartDetails.products.filter((product) => product.count > 0).map((product) => <div key={product.product._id} className="row border-bottom align-items-center py-2 my-2">
          <div className="col-md-1">
            <img src={product.product.imageCover} alt="productImg" className='w-100' />
          </div>

          <div className="col-md-11 d-flex justify-content-between">

            <div>
              <h6>{product.product.title}</h6>
              <h6 className='text-main'>Price : {product.price} EGP</h6>
              <button onClick={() => deleteItem(product.product._id)} className='btn m-0 p-0'><i className='fa-regular text-main fa-trash-can'></i> Remove</button>
            </div>

            <div>
              <button onClick={() => updateProductQuantity(product.product._id, product.count + 1)} className='btn border-main btn-sm'>+</button>
              <span className='mx-2'>{product.count}</span>

              <button onClick={() => updateProductQuantity(product.product._id, product.count - 1)} className='btn border-main btn-sm'>-</button>

            </div>

          </div>

        </div>
        )}

      </div>


      <button className='btn btn-main' >
        <Link className='text-white ' to={'/checkout'}>Checkout</Link>
      </button>

    </div> : null}

  </>
}
