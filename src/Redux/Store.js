import {configureStore} from '@reduxjs/toolkit';
import { counterReducer } from './CounterSlice';
import { productReducer } from './ProductSlice';

export let Store = configureStore({
    reducer:{
counter:counterReducer,
Products:productReducer,
    }
})