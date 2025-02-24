import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiBox, FiShoppingCart, FiLogOut, FiGrid } from "react-icons/fi";

const Sidebar = ({ userInfo, handleLogout, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Dashboard"); // Default active item

  const handleNavigate = (path, label) => {
    setActive(label);
    navigate(path);
    setIsSidebarOpen(false); // Close sidebar when navigating
  };

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-[#6a11cb] to-[#2575fc] p-6 shadow-2xl flex flex-col text-white rounded-2xl">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-white text-[#6a11cb] rounded-full flex items-center justify-center text-3xl font-bold shadow-md">
          {userInfo?.name?.charAt(0).toUpperCase()}
        </div>
        <h2 className="mt-3 text-lg font-semibold">{userInfo?.name || "Admin"}</h2>
        <p className="text-sm text-gray-200">{userInfo?.email}</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2 flex-grow">
        <NavItem
          icon={<FiGrid />}
          label="Dashboard"
          onClick={() => handleNavigate("/admin/dashboard", "Dashboard")}
          isActive={active === "Dashboard"}
        />
        <NavItem
          icon={<FiUsers />}
          label="Users"
          onClick={() => handleNavigate("/admin/users", "Users")}
          isActive={active === "Users"}
        />
        <NavItem
          icon={<FiBox />}
          label="Products"
          onClick={() => handleNavigate("/admin/products", "Products")}
          isActive={active === "Products"}
        />
        <NavItem
          icon={<FiShoppingCart />}
          label="Orders"
          onClick={() => handleNavigate("/admin/orders", "Orders")}
          isActive={active === "Orders"}
        />
      </nav>

      {/* Logout Button */}
      <button
        onClick={() => {
          handleLogout();
          setIsSidebarOpen(false); // Close sidebar after logging out
        }}
        className="mt-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        <FiLogOut size={18} /> Logout
      </button>
    </div>
  );
};

// Reusable Sidebar Button Component with Active State
const NavItem = ({ icon, label, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-md font-medium transition ${
      isActive ? "bg-white/30 text-white" : "hover:bg-white/20 text-white"
    }`}
  >
    {icon} <span>{label}</span>
  </button>
);

export default Sidebar;
