import dotenv from 'dotenv'
import mongoose from 'mongoose'
import users from './data/users.js'
import products from './data/products.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'
import connectDB from './config/db.js'
import Order from './models/orderModel.js'

dotenv.config()

connectDB()

const importData = async()=>{
    try{
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[2]._id

        const sampleProducts = products.map(p=>{
            return {...p, user: adminUser}
        })
        await Product.insertMany(sampleProducts)
        console.log("Data imported")
    }catch(error){
        console.error(`Error: ${error}`)
        process.exit(1)
    }
}
const destroyData = async()=>{
    try{
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        console.log("Data Destroyed")
        process.exit()
    }catch(error){
        console.log(`Error: ${error}`)
    }
}

console.log(process.argv[2])

if(process.argv[2] == '-d'){
    destroyData()
}else{
    importData()
}