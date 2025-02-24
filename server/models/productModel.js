// import mongoose from "mongoose"
// const reviewSchema = mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User",
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   rating: {
//     type: Number,
//     required: true,
//   },
//   comment: {
//     type: String,
//     required: true,
//   },
// })

// const productSchema = mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     brand: {
//       type: String,
//       required: true,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     reviews: [reviewSchema],
//     rating: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     numReviews: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     price: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     countInStock: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// )

// const Product = mongoose.model("Product", productSchema)

// export default Product

import mongoose from "mongoose";

// Review Schema
const reviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

// Size Schema
const sizeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Product Schema
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema], // Array of reviews
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountPercent: {
      type: Number,
      default: function () {
        const originalPrice = Number(this.originalPrice) || 0;
        const price = Number(this.price) || 0;
    
        if (originalPrice === 0) return 0; // Prevent division by zero
    
        return Math.round(((originalPrice - price) / originalPrice) * 100);
      },
    },
    
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    color: {
      type: String,
      //required: true,
    },
    size: [sizeSchema], // Array of sizes with quantity
  },
  {
    timestamps: true,
  }
);
productSchema.index({ name: "text", category: "text" }); 
const Product = mongoose.model("Product", productSchema);

export default Product;

