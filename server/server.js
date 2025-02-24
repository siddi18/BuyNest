import express from "express";
import dotenv from "dotenv";
import path from 'path'
import connectDB from "./config/db.js";
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import passport from './utils/passport.js'
import authRoute from './routes/authRoute.js'
import orderRoute from './routes/orderRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import cors from 'cors'
import stripeUtil from "./utils/stripe.js";
import adminRoute from "./routes/adminRoute.js"

dotenv.config()

connectDB()
const app = express()

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://sidtech.onrender.com")
//     next()
//   })

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    next()
  })
  
  
app.use(
    cors({
      origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
      methods: "GET, POST, PATCH, DELETE, PUT",
      credentials: true,
    })
  )
  
  app.use(cookieParser())
  app.use(express.json())
  app.use(express.urlencoded({extended:true}))
  passport(app)
  stripeUtil(app)

// Serve files statically from the 'uploads' directory
const __dirname = path.resolve();

const PORT = process.env.PORT;


app.use('/api/products', productRoute)
app.use('/api/admin', adminRoute)
app.use('/api/users', userRoute)
app.use('/auth', authRoute)
app.use('/api/orders', orderRoute)
app.use('/api/upload', uploadRoute)


 if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve()
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use(express.static(path.join(__dirname, "/client/dist")))
  app.use("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  )
} else {
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.get("/", (req, res) => {
    res.send("Api is running...")
  })
}

app.use(errorHandler)
app.use(notFound)

app.listen(PORT, ()=>{
    console.log(`Sever is Connected at ${PORT}`)
})