import { createContext, useEffect, useState } from "react";
import axios from 'axios';


export let cartContext = createContext();

export default function CartContextProvider (props){

   const [cartId,setCartId]= useState(null);
   const [numOfCartItems,setnumOfCartItems]= useState(0);

    async function getCart(){

        let response = await getLoggedUserCart();
       if (response?.data?.status === 'success'){
        setnumOfCartItems (response.data.numOfCartItems);
        setCartId(response.data.data._id);
       }       
        // console.log(response);
    }

    useEffect(()=>{
        getCart();
    },[]);



    let userToken = localStorage.getItem('userToken')
    let headers = {Token:userToken}
 
    function addToCart(Id) { 

      return  axios.post ('https://ecommerce.routemisr.com/api/v1/cart',{productId:Id} ,{headers})
      .then((response)=>response)
      .catch((err)=>err)
        
     } 

     function getLoggedUserCart(Id) {
        return axios.get (`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
        .then((response)=>response)
        .catch((err)=>err)
     }

     function removeItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {headers})
        .then((response)=>response)
        .catch((err)=>err) 
        
       
    }
     
    function updateProductCount(productId,count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count}, {headers})
        .then((response)=>response)
        .catch((err)=>err) 
       

    }

    function onlinePayment(cartId,shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, {shippingAddress:shippingAddress}, {headers:headers})
        .then((response)=>response)
        .catch((err)=>err) 
        
    }


return <cartContext.Provider value={{getCart, addToCart, getLoggedUserCart, removeItem, updateProductCount, onlinePayment, numOfCartItems, cartId, setnumOfCartItems}}>
     {props.children}

    </cartContext.Provider>
}

