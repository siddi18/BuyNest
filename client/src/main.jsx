import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.jsx'
import ProductsScreen from './screens/ProductsScreen.jsx'
import {Provider} from 'react-redux';
import store from './store.js'
import CartScreen from './screens/CartScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import ResetPassword from './screens/ResetPassword.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import ShippingScreen from './screens/ShippingScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import PaymentScreen from './screens/PaymentScreen.jsx'
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx'
import OrderScreen from './screens/OrderScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import SuccessScreen from './screens/SuccessScreen.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import UserEditScreen from './screens/admin/UserEditScreen.jsx'
import ProductListScreen from './screens/admin/ProductListScreen.jsx'
import OrderListScreen from './screens/admin/OrderListScreen.jsx'
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx'
import UserListScreen from './screens/admin/UserListScreen.jsx'
import Search from './components/header/Search.jsx'
import CategoryPage from './screens/CategoryPage.jsx'
import SearchResults from './screens/SearchResults.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import ProductCreateScreen from './screens/admin/ProductCreateScreen.jsx'
import Dashboard from './screens/admin/Dashboard.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}> 
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<SearchResults />} />
      <Route path='/search' element={<Search />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/products/:id' element={<ProductsScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
      <Route path='/category/:categoryName' element={<CategoryPage />} />
      {/* Private route */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/place-order' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/success-screen' element={<SuccessScreen />} />
      </Route>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path="users" element={<UserListScreen />} />
            <Route path="users/:id/edit" element={<UserEditScreen />} />
            <Route path="products" element={<ProductListScreen />} />
            <Route path="products/:pageNumber" element={<ProductListScreen />} />
            <Route path="orders" element={<OrderListScreen />} />
            <Route path="product/edit/:id" element={<ProductEditScreen />} />
            <Route path="product/create" element={<ProductCreateScreen />} />
          </Route>
        </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
