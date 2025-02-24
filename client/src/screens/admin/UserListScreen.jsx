import React from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function UserListScreen() {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  const onDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await deleteUser(id);
        toast.success(res.message);
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <div className="text-red-600 font-semibold">Error: {error.message}</div>;

  return (
    <div className="flex flex-col w-full p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">User List</h2>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full border-collapse rounded-lg">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-4 text-blue-600 border-r border-gray-300 rounded-tl-lg">ID</th>
              <th className="p-4 text-blue-600 border-r border-gray-300">Name</th>
              <th className="p-4 text-blue-600 border-r border-gray-300">Email</th>
              <th className="p-4 text-blue-600 border-r border-gray-300">Admin</th>
              <th className="p-4 text-blue-600 text-center rounded-tr-lg">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users?.map((user, index) => (
              <tr
                key={user._id}
                className={`border-b border-gray-300 hover:bg-gray-100 transition ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-4 text-gray-600 border-r border-gray-300">{user._id}</td>
                <td className="p-4 font-semibold text-gray-800 border-r border-gray-300">{user.name}</td>
                <td className="p-4 text-gray-600 border-r border-gray-300">{user.email}</td>
                <td className="p-4 border-r border-gray-300">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                      user.isAdmin ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </td>
                <td className="p-4 flex justify-center gap-4">
                  {!user.isAdmin && (
                    <>
                      <button
                        className="text-blue-600 hover:text-blue-800 transition"
                        onClick={() => navigate(`/admin/users/${user._id}/edit`)}
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 transition"
                        onClick={() => onDelete(user._id)}
                      >
                        <FaTrash size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
