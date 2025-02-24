import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";


// const getProducts = asyncHandler(async (req, res) => {
//   const keyword = req.query.search
//     ? {
//         $or: [
//           { name: { $regex: req.query.search, $options: "i" } }, // Search in name
//           { category: { $regex: req.query.search, $options: "i" } }, // Search in category
//         ],
//       }
//     : {};

//   console.log("Search keyword received:", req.query.search);
//   console.log("MongoDB Query:", JSON.stringify(keyword));

//   try {
//     const products = await Product.find(keyword); // Fix: Remove unnecessary spread operator
//     if (products.length > 0) {
//       res.json(products); // Return products
//     } else {
//       res.status(404).json({ message: "No products found" });
//     }
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });
// const getProducts = asyncHandler(async (req, res) => {
//   try {
//     const keyword = req.query.search;
//     if (!keyword) {
//       return res.status(400).json({ message: "Search keyword is required" });
//     }

//     const products = await Product.find({
//       $text: { $search: keyword }, // Perform text search
//     });

//     if (products.length > 0) {
//       res.json(products);
//     } else {
//       res.status(404).json({ message: "No products found" });
//     }
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

const getProducts = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.search ? { $text: { $search: req.query.search } } : {};

    const products = await Product.find(keyword);

    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
});




const getProductById = asyncHandler(async(req,res)=>{
    //const productId = mongoose.Types.ObjectId(req.params.id);
    const product =await Product.findById(req.params.id);
    if(product){
        res.json(product);  
    }else{
        res.status(404);
        throw new Error('Product not found')
    }
})

// const createProduct = asyncHandler(async (req, res) => {
    
//     console.log('body from createprod :', req.user._id)
//     const product = new Product({
//       name: "Sample Name",
//       price: 0,
//       user: req.user._id,
//       image: "/images/sample.jpg",
//       brand: "Sample Brand",
//       category: "Sample category",
//       countInStock: 0,
//       numReviews: 0,
//       description: "Sample description",
//     })
  
//     const createdProduct =await product.save()
//     res.status(201).json(createdProduct)
//   })

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, image, brand, category, countInStock, description, originalPrice } = req.body;
    if (!name || !price || !image || !brand || !category || !countInStock || !description || !originalPrice) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const product = new Product({
      name,
      price,
      user: req.user._id, 
      image,
      brand,
      category,
      countInStock,
      numReviews: 0,
      rating: 0,
      originalPrice,
      discountPercent: 10,
      color: "gold",
      description,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error" });
  }
});



  const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, image, brand, category, countInStock, description } =
      req.body
    const product = await Product.findById(req.params.id)
    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock
  
      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error("Product Not Found")
    }
  })

  const deleteProduct = asyncHandler(async(req, res) =>{

    const product = await Product.findById(req.params.id)

    if(product){
      await Product.deleteOne({_id: product._id})
      res.json({message : 'product deleted successfully'})
    }else{
      res.status(404)
      throw new Error('Product Not Found')
    }
  })

  const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        review => review.user._id.toString() === req.user._id.toString()
      )
  
      if (alreadyReviewed) {
        res.status(400)
        throw new Error("Product already reviewed")
      }
      const review = {
        name: req.user.name,
        rating: +rating,
        comment,
        user: req.user._id,
      }
      product.reviews.push(review)
  
      product.numReviews = product.reviews.length
  
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
  
      await product.save()
      res.status(201).json({
        message: "Review Added",
      })
    } else {
      res.status(404)
      throw new Error("Product Not Found")
    }
  })

export {getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview}