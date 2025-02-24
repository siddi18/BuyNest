import React from 'react';
import Product from '../components/Product.jsx'
import { useGetProductsQuery } from '../slices/productsApiSlice.js';
import Spinner from '../components/Spinner.jsx'
import {useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useDispatch} from 'react-redux'
import { setCredentials } from '../slices/userSlice.js';
import axios from 'axios'
import { useEffect } from 'react';
import Paginate from '../components/Paginate.jsx';
import HomeCarousel from '../components/carousel/HomeCarousel.jsx';
import Homepage from './HomePage.jsx';
import CategoryNav from './CategoryNav.jsx';
import SaleTime from './SaleTime.jsx';
 
export default function HomeScreen() {
    const {keyword, pageNumber} = useParams()
 const dispatch = useDispatch()
 const {data, isLoading, error} = useGetProductsQuery({keyword, pageNumber})
 const getUser = async () => {
     try {
         const res = await axios.get('http://localhost:3000/auth/login/success', {
             withCredentials: true
         })
   
         dispatch(setCredentials({ ...res.data.user._json, _id: res.data._id, isAdmin: res.data.user.isAdmin }))
     } catch (error) {
         toast.error(error?.data?.message || error?.error)
     }
 }

 useEffect(() => {
     getUser()
 }, [])
 if(isLoading){
  return <Spinner />
 }
 if(error){
  toast.error(error?.data?.message || error?.error )
 }


  return (
    <>
    <CategoryNav />
    <HomeCarousel />
    <SaleTime />
    <Homepage />
    </>
    )
      
}
