import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCreateReviewMutation, useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { Star } from "lucide-react";


export default function ProductScreen() {
    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [userComment, setUserComment] = useState('');
    const [userRating, setUserRating] = useState(5);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: productId } = useParams();
    
    const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);
    const [createReview, { isLoading: LoadingCreateReview }] = useCreateReviewMutation();

    if (isLoading) return <Spinner />;
    if (error) toast.error(error?.data?.message || error?.error);

    function addToCartHandler() {
        if (!product) {
            toast.error("Product details not available");
            return;
        }
    
        if (!selectedSize) {
            toast.error("Please select a size");
            return;
        }
    
        // Ensure quantity is at least 1
        const quantity = qty > 0 ? qty : 1;
    
        try {
            dispatch(addToCart({ 
                _id: product._id, 
                name: product.name, 
                image: product.image, 
                price: product.price, 
                countInStock: product.countInStock, 
                qty: quantity, 
                selectedSize 
            }));
    
            toast.success("Added to cart!");
            navigate('/cart');
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add product to cart. Please try again.");
        }
    }

    function buyHandler(){
        if (!product) {
            toast.error("Product details not available");
            return;
        }
    
        if (!selectedSize) {
            toast.error("Please select a size");
            return;
        }
    
        // Ensure quantity is at least 1
        const quantity = qty > 0 ? qty : 1;
        dispatch(addToCart({ 
            _id: product._id, 
            name: product.name, 
            image: product.image, 
            price: product.price, 
            countInStock: product.countInStock, 
            qty: quantity, 
            selectedSize 
        }));
        navigate('/shipping');
    }
    
    

    async function handleCreateReview(e) {
        e.preventDefault();
        try {
            const res = await createReview({ productId, rating: userRating, comment: userComment }).unwrap();
            toast.success(res.message);
            setUserComment('');
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || error?.error);
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Back Button */}
            <Link to="/" className="inline-block mb-4">
                <button className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900 transition">
                    ← Go Back
                </button>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Product Image */}
{/* Product Image */}
<div className="flex justify-center">
  <img 
    src={product.image} 
    alt={product.name} 
    className="w-[250px] h-[300px] md:w-[300px] md:h-[450px] rounded-lg shadow-lg hover:scale-105 transition-transform object-contain"
  />
</div>


                {/* Product Details */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>
                    <p className="text-gray-600 mt-3">{product.description}</p>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mt-3">
                        <span className="text-yellow-500 text-lg font-semibold">{product.rating} ⭐</span>
                        <span className="text-gray-500">({product.numReviews} reviews)</span>
                    </div>

                    {/* Price & Discount */}
                    <div className="flex items-center space-x-3 mt-3">
                        <span className="text-3xl font-bold text-red-500">₹{product.price}</span>
                        <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                        <span className="text-green-600 font-medium">{product.discountPercent}% OFF</span>
                    </div>

                    {/* Stock Status */}
                    <p className={`mt-3 font-medium ${product.countInStock > 0 ? "text-green-600" : "text-red-500"}`}>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </p>

                    {/* Size Selector */}
                    
                    <div className="mt-6">
    <label className="text-gray-800 font-semibold text-lg block mb-3">Select Size:</label>
    <div className="flex flex-wrap gap-3">
        {product.size.map((size) => (
            <button
                key={size.name}
                onClick={() => setSelectedSize(size.name)}
                disabled={size.quantity === 0}
                className={`px-5 py-2 rounded-lg font-medium border-2 transition-all duration-300
                    ${
                        selectedSize === size.name
                            ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                    }
                    ${size.quantity === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
            >
                {size.name} <span className="text-sm">({size.quantity} left)</span>
            </button>
        ))}
    </div>
</div>


                    

                    {/* Quantity Selector */}
                    {product.countInStock > 0 && (
                        <div className="mt-4">
                            <label className="text-gray-700 font-medium">Quantity:</label>
                            <select
                                className="bg-white border border-gray-300 p-2 rounded-md mt-2"
                                value={qty}
                                onChange={(e) => setQty(Number(e.target.value))}
                            >
                                {[...Array(product.countInStock).keys()].map((num) => (
                                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex space-x-4 mt-6">
                        <button
                            className="px-6 py-2 bg-yellow-400 text-gray-800 rounded-lg hover:bg-yellow-500 transition cursor-pointer"
                            onClick={addToCartHandler}
                        >
                            Add to Cart
                        </button>
                        <button
                            className="px-6 py-2 bg-orange-500 text-gray-800 rounded-lg hover:bg-orange-600 transition cursor-pointer"
                            onClick={buyHandler}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Customer Reviews */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold">Customer Reviews</h2>
                {product?.reviews.length === 0 && <p className="text-gray-600 mt-2">No reviews yet.</p>}
                
                <div className="mt-4 space-y-4">
                    {product?.reviews.map((review, i) => (
                        <div key={i} className="border rounded-md p-4 shadow-md">
                            <div className="flex items-center space-x-2">
                                {[...Array(review.rating).keys()].map(num => (
                                    <span key={num} className="text-yellow-500 text-lg">★</span>
                                ))}
                            </div>
                            <p className="text-gray-700 mt-2">{review.comment}</p>
                            <p className="text-gray-500 text-sm">- {review.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Write a Review */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold">Write a Review</h3>
                <div className="mt-3">
                    <label className="text-gray-700">Your Review:</label>
                    <textarea
                        className="bg-white border border-gray-300 p-3 rounded-md mt-2 w-full"
                        rows="4"
                        placeholder="Write your review..."
                        value={userComment}
                        onChange={e => setUserComment(e.target.value)}
                    />
                </div>

                {/* <div className="mt-3">
                    <label className="text-gray-700">Rating:</label>
                    <select
                        className="bg-white border border-gray-300 p-2 rounded-md mt-2"
                        value={userRating}
                        onChange={e => setUserRating(Number(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5].map(r => (
                            <option key={r} value={r}>{r} stars</option>
                        ))}
                    </select>
                </div> */}


<div className="mt-4">
    <label className="text-gray-800 font-medium block mb-2">Your Rating:</label>
    <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
            <Star
                key={star}
                size={30}
                className={`cursor-pointer transition-colors ${
                    userRating >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
                }`}
                onClick={() => setUserRating(star)}
            />
        ))}
    </div>
</div>


                <button
                    className="bg-blue-500 text-white px-5 py-2 rounded-md mt-4 hover:bg-blue-600 transition"
                    onClick={handleCreateReview}
                >
                    Submit Review
                </button>
            </div>

            {/* Loader for review submission */}
            {LoadingCreateReview && <Spinner />}
        </div>
    );
}
