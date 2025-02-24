import React, { useState, useEffect } from 'react';
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductEditScreen() {
    const { id: productId } = useParams();
    const { data: product, isLoading: loadingProduct, error } = useGetProductDetailsQuery(productId);
    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        name: product?.name || '',
        price: product?.price || '',
        image: product?.image || '',
        brand: product?.brand || '',
        category: product?.category || '',
        countInStock: product?.countInStock || '',
        description: product?.description || '',
    });

    useEffect(() => {
        if (product) {
            setProductData({
                name: product.name || '',
                price: product.price || '',
                image: product.image || '',
                brand: product.brand || '',
                category: product.category || '',
                countInStock: product.countInStock || '',
                description: product.description || '',
            });
        }
    }, [product]);

    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({ productId, ...productData }).unwrap();
            toast.success("Product Updated");
            navigate("/admin/products");
        } catch (error) {
            toast.error(error?.data?.message || error?.error);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const uploadFileHandler = async () => {
        if (!selectedFile) {
            toast.error("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'your_upload_preset');
        setUploading(true);

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            setProductData({ ...productData, image: data.secure_url });
            toast.success("Image uploaded successfully");
        } catch (error) {
            toast.error("Image upload failed");
        }
        setUploading(false);
    };

    return (
        <div className='w-full max-w-lg mx-auto p-4 sm:p-6 md:p-8'>
            <h2 className="text-2xl font-semibold mb-4 text-center">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block font-medium">Name:</label>
                    <input type="text" id="name" name="name" value={productData.name} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-md" />
                </div>
                <div>
                    <label htmlFor="image" className="block font-medium">Image:</label>
                    <input type="file" id="image" name="image" accept='image/*' onChange={handleFileChange} className="w-full border border-gray-300 p-2 rounded-md" />
                    <button type="button" onClick={uploadFileHandler} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto">Upload Image</button>
                    {uploading && <p>Uploading...</p>}
                </div>
                <div>
                    <label htmlFor="price" className="block font-medium">Price:</label>
                    <input type="number" id="price" name="price" value={productData.price} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-md" />
                </div>
                <div>
                    <label htmlFor="brand" className="block font-medium">Brand:</label>
                    <input type="text" id="brand" name="brand" value={productData.brand} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-md" />
                </div>
                <div>
                    <label htmlFor="category" className="block font-medium">Category:</label>
                    <input type="text" id="category" name="category" value={productData.category} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-md" />
                </div>
                <div>
                    <label htmlFor="countInStock" className="block font-medium">Count In Stock:</label>
                    <input type="number" id="countInStock" name="countInStock" value={productData.countInStock} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-md" />
                </div>
                <div>
                    <label htmlFor="description" className="block font-medium">Description:</label>
                    <textarea id="description" name="description" value={productData.description} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-md" />
                </div>
                <div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto" type="submit">Update Product</button>
                    {loadingUpdate && <p>Updating...</p>}
                </div>
            </form>
        </div>
    );
}
