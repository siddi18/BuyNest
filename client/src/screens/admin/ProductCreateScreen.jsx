import React, { useState } from "react";
import { useCreateProductMutation } from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProductCreateScreen() {
  const navigate = useNavigate();
  const [createProduct, { isLoading: creatingProduct }] = useCreateProductMutation();

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
    brand: "",
    category: "",
    countInStock: "",
    description: "",
    originalPrice: "",
  });

  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { name, price, image, brand, category, countInStock, description, originalPrice } = productData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const uploadFileHandler = async () => {
    if (!selectedFile) return;
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "First_Time_Using_Cloudinary");
    formData.append("cloud_name", "diqynm3ie");

    try {
      setUploading(true);
      const res = await fetch("https://api.cloudinary.com/v1_1/diqynm3ie/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setProductData({ ...productData, image: data.url });
      toast.success("Image Uploaded Successfully!");
      setSelectedFile(null);
    } catch (error) {
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload an image first!");
      return;
    }
    try {
      await createProduct(productData).unwrap();
      toast.success("Product Created Successfully!");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h2 className="text-2xl sm:text-3xl font-semibold my-4 text-center">Create Product</h2>
      
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white p-6 rounded-lg shadow-md">
        {/* Image Upload */}
        <div className="mb-4">
          <label className="block font-medium">Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded-md" />
          {selectedFile && (
            <button onClick={uploadFileHandler} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full">
              Upload
            </button>
          )}
          {uploading && <p className="mt-2 text-blue-500">Uploading...</p>}
          {image && <img src={image} alt="Preview" className="mt-2 w-32 h-32 object-cover mx-auto" />}
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          {Object.keys(productData).map((field) => (
            field !== "image" && (
              <div key={field} className="mb-4">
                <label className="block font-medium capitalize">{field.replace(/([A-Z])/g, ' $1')}:</label>
                <input 
                  type={field.includes("Price") || field.includes("count") ? "number" : "text"} 
                  name={field}
                  value={productData[field]}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded-md" 
                  required 
                />
              </div>
            )
          ))}

          <button 
            type="submit" 
            className={`w-full bg-green-500 text-white py-3 px-4 rounded-md ${!image ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"}`} 
            disabled={!image}
          >
            {creatingProduct ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
