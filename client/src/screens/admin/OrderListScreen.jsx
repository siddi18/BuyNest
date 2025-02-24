import React from "react";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import { FaEye } from "react-icons/fa";

export default function OrderListScreen() {
  const { data, isLoading, error } = useGetOrdersQuery();

  if (isLoading) return <Spinner />;
  if (error) toast.error(error.message);

  return (
    <div className="flex flex-col w-full p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Orders List</h2>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full border-collapse rounded-lg">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-4 text-blue-600 border-r border-gray-300 rounded-tl-lg">
                ID
              </th>
              <th className="p-4 text-blue-600 border-r border-gray-300">User</th>
              <th className="p-4 text-blue-600 border-r border-gray-300">Date</th>
              <th className="p-4 text-blue-600 border-r border-gray-300">Total</th>
              <th className="p-4 text-blue-600 border-r border-gray-300">Delivered</th>
              <th className="p-4 text-blue-600 text-center rounded-tr-lg">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((order, index) => (
              <tr
                key={order._id}
                className={`border-b border-gray-300 hover:bg-gray-100 transition ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-4 text-gray-600 border-r border-gray-300">
                  {order._id}
                </td>
                <td className="p-4 font-semibold text-gray-800 border-r border-gray-300">
                  {order.user?.name || "Guest"}
                </td>
                <td className="p-4 text-gray-600 border-r border-gray-300">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 font-bold text-gray-800 border-r border-gray-300">
                  ${order.totalPrice}
                </td>
                <td
                  className={`p-4 font-bold border-r border-gray-300 ${
                    order.isDelivered ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.isDelivered ? "Yes" : "No"}
                </td>
                <td className="p-4 flex justify-center gap-4">
                  <Link to={`/order/${order._id}`}>
                    <button className="text-blue-600 hover:text-blue-800 transition">
                      <FaEye size={18} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
