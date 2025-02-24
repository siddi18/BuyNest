import { apiSlice } from "./apiSlice"
import { BACKEND_URL, ORDERS_URL } from "../constants"

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: data => ({
        url: ORDERS_URL,
        method: "POST",
        body: data,
      })
    }),
    getOrderDetails: builder.query({
      query: id =>({
        url: `${ORDERS_URL}/${id}`
      }),
      keepUnusedDataFor: 5

    }),
    getUserOrders: builder.query({
      query: (id) => { // Pass the user object as an argument
        console.log('userId from getuser 1:', id)
       
        return {
          url: 'http://localhost:5000/api/orders/user-orders',
          headers: {
            Authorization: id,
          },
        };
      },
      keepUnusedDataFor: 5,
    }),
    payWithStripe:builder.mutation({
      query: orderItems => ({
        url: `${BACKEND_URL}/create-checkout-session`,
        method: "POST",
        body: orderItems
      })
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder : builder.mutation({
      query: orderId =>({
        url: `${ORDERS_URL}/deliver/${orderId}`,
        method: "PATCH"
      })
    })
  
})
})

export const {useCreateOrderMutation,useGetOrderDetailsQuery, useGetUserOrdersQuery, usePayWithStripeMutation, useGetOrdersQuery, useDeliverOrderMutation} = orderApiSlice