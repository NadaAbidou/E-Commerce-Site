import { createSlice } from "@reduxjs/toolkit";


let x = {products:[]}
export let productSlice = createSlice({
    name:'products',
    initialState:x,
    reducers:{
        getProducts:(state,action)=>{
            console.log(state);

        }  
      }
})

export let productReducer = productSlice.reducer;
export let {getProducts} = productSlice.actions