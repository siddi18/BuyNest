import Order from "../models/orderModel.js"
import asyncHandler from "express-async-handler"

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user
  } = req.body
  // console.log('order itmes :', orderItems)
  // console.log('user   :', user)
  // console.log('shipping address :', shippingAddress)

  const { address, city, postalCode, country } = shippingAddress;

  if (orderItems?.length === 0) {
    res.status(400)
    throw new Error("No Order Items")
  } else {
    const order = new Order({
      orderItems: orderItems.map(item => ({
        ...item, product: item._id,
      })),
      user: user._id,
      shippingAddress: {
        address,
        city,
        postalCode,
        country,
      },
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

const getOrderById = asyncHandler(async(req,res)=>{
  console.log('getorder by id', req.params.id)
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  //console.log('order from gerOrderId :',order)
  if(order){
    res.status(200).json(order)
    //res.status(200).json({ message: "Order processed successfully", order: order });

  }else{
    res.status(404) 
    throw new Error('Order not found')
  }
  
})

const getUserOrders = asyncHandler(async (req, res) => {
  const id = req.headers.authorization;
  //const [bearer, userId] = id.split(' ');
  console.log('user from getuser 20 :', id)
  const orders = await Order.find({ user: id }).populate("user", 'name email')
  res.status(200).json(orders)
})

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "id name")
  res.send(orders)
})

const updateOrderToDelivered = asyncHandler(async(req, res) => {
  const order = await Order.findById(req.params.id) 
  if(order){
    order.isDelivered = true
    order.deliveredAt = Date.now()
    const updateOrder = await order.save()
    res.json(updateOrder)
  }else{
    res.status(404) 
    throw new Error('Order not found')
  }
})

export {addOrderItems, getOrderById, getUserOrders, getOrders, updateOrderToDelivered}