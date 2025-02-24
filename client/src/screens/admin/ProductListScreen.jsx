import React from "react";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "../../slices/productsApiSlice";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function ProductListScreen() {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { data, isLoading, error, refetch } = useGetAdminProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const createProductHandler = async () => {
    navigate('/admin/product/create')
  };

  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const res = await deleteProduct(id);
        refetch();
        toast.success(res.message);
      } catch (error) {
        toast.error(error?.message || error?.error);
      }
    }
  };

  const editProductHandler = (id) => {
    navigate(`/admin/product/edit/${id}`);
  };

  return (
    <div className="flex flex-col w-full p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Product List</h2>
        <button
          className="bg-blue-600 text-white px-5 py-2 flex items-center gap-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={createProductHandler}
        >
          <FaPlus /> Create Product
        </button>
      </div>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-600 font-semibold">{error.message}</div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="w-full border-collapse rounded-lg">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="p-4 text-blue-600 border-r border-gray-300 rounded-tl-lg">
                    ID
                  </th>
                  <th className="p-4 text-blue-600 border-r border-gray-300">
                    Name
                  </th>
                  <th className="p-4 text-blue-600 border-r border-gray-300">
                    Brand
                  </th>
                  <th className="p-4 text-blue-600 border-r border-gray-300">
                    Price
                  </th>
                  <th className="p-4 text-blue-600 text-center rounded-tr-lg">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {data?.products?.map((product, index) => (
                  <tr
                    key={product._id}
                    className={`border-b border-gray-300 hover:bg-gray-100 transition ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="p-4 text-gray-600 border-r border-gray-300">
                      {product._id}
                    </td>
                    <td className="p-4 font-semibold text-gray-800 border-r border-gray-300">
                      {product.name}
                    </td>
                    <td className="p-4 text-gray-600 border-r border-gray-300">
                      {product.brand}
                    </td>
                    <td className="p-4 font-bold text-gray-800 border-r border-gray-300">
                      ${product.price}
                    </td>
                    <td className="p-4 flex justify-center gap-4">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition"
                        onClick={() => editProductHandler(product._id)}
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 transition"
                        onClick={() => deleteProductHandler(product._id)}
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {loadingDelete && <Spinner />}

          <div className="flex justify-center mt-8">
            <Paginate
              pages={data?.pages}
              page={data?.pageNumber}
              isAdmin={userInfo.isAdmin}
            />
          </div>
        </>
      )}
    </div>
  );
}
