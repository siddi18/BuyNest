import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const categoryMapping = {
  "Shoes": "MensShoes",
  "Kurthas": "Kurthas",
  "Lehengas": "womensLehengaCholi",
  "Kurthis": "womensKurtha",
  "Dresses": "Dress",
  "Gowns": "Gown",
};

const SkeletonLoader = () => (
  <div className="border p-4 rounded-xl shadow-lg animate-pulse bg-gray-200">
    <div className="w-full h-48 sm:h-60 bg-gray-300 rounded-lg"></div>
    <div className="mt-4 h-4 w-3/4 bg-gray-400 rounded"></div>
    <div className="mt-2 h-4 w-1/2 bg-gray-400 rounded"></div>
    <div className="mt-2 h-8 w-full bg-gray-500 rounded"></div>
  </div>
);

const CategoryPage = () => {
  const { categoryName } = useParams();
  const backendCategory = categoryMapping[categoryName] || categoryName;
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ price: "", brand: "" });
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false); // Mobile Filter Toggle

  useEffect(() => {
    if (!categoryName) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://buynest.onrender.com/api/products/category/${backendCategory}`
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredProducts = products.filter((product) => {
    return (
      (!filters.price || product.price <= filters.price) &&
      (!filters.brand || product.brand === filters.brand)
    );
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
      
      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden w-full bg-blue-600 text-white font-medium py-2 rounded-lg mb-4"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Filters (Responsive) */}
        <aside className={`md:w-1/4 bg-white shadow-lg p-6 rounded-xl border ${showFilters ? "block" : "hidden"} md:block`}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Filters</h2>

          {/* Price Filter */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">Max Price: ₹{filters.price}</label>
            <input
              type="range"
              name="price"
              min="0"
              max="5000"
              value={filters.price}
              onChange={handleFilterChange}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>₹0</span>
              <span>₹5000</span>
            </div>
          </div>

          {/* Brand Filter */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium">Brand</label>
            <select
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              className="mt-2 w-full border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All Brands</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Puma">Puma</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          <button
            onClick={() => setFilters({ price: "", brand: "" })}
            className="w-full bg-red-500 text-white font-medium py-2 rounded-lg hover:bg-red-600 transition"
          >
            Reset Filters
          </button>
        </aside>

        {/* Product Grid */}
        <section className="md:w-3/4">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            {categoryName} Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading
              ? Array(6).fill(0).map((_, index) => <SkeletonLoader key={index} />)
              : filteredProducts.length > 0
              ? filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border p-4 rounded-xl shadow-lg hover:shadow-xl transition"
                  >
                    <div className="relative w-full h-48 sm:h-60 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mt-4 text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mt-1">₹{product.price}</p>
                    <Link
                      to={`/products/${product._id}`}
                      className="block mt-2 bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600"
                    >
                      View Details
                    </Link>
                  </div>
                ))
              : <p className="text-gray-500">No products found</p>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CategoryPage;
