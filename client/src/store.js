import {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import cartReducer from './slices/cartSlice'
import useReducer from './slices/userSlice'

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
        cart : cartReducer,
        user: useReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store