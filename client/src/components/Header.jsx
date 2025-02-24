import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiSearch, FiX } from "react-icons/fi";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/userSlice";
import { TypeAnimation } from "react-type-animation";

const categoryNames = ["Shoes", "Kurthas", "Gowns", "Dresses", "Lehangas"];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();
  const location = useLocation();

  const [keyword, setKeyword] = useState("");
  const [isStopped, setIsStopped] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.user?.userInfo);
  const closeDropdown = () => setIsOpen(false);
  // 🔹 Handle Logout
  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  // 🔹 Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
    setMobileSearchOpen(false);
  };

  return (
    <>
      {/* 🔹 Navbar */}
      <nav className="bg-white shadow-lg p-4">
        <div className="container mx-auto flex items-center justify-between">
          
          {/* 🔹 Logo */}
 {/* Hidden on mobile, visible on larger screens */}
<div className="hidden md:block">
  <Link
    to={userInfo?.isAdmin ? "/admin" : "/"}
    className="text-blue-600 text-3xl font-bold"
  >
    BuyNest
  </Link>
</div>

{/* Visible on mobile, aligns differently based on screen size */}
<div className="w-full flex md:justify-start justify-center md:hidden">
  <Link
    to={userInfo?.isAdmin ? "/admin" : "/"}
    className="text-blue-600 text-3xl font-bold"
  >
    BuyNest
  </Link>
</div>


          {/* 🔹 Desktop Search Bar (Hidden on Mobile) */}
          {!userInfo?.isAdmin && (
           location.pathname === "/login" || "/register" ? null : (<form
           onSubmit={handleSearch}
           className="hidden md:flex mx-6 items-center bg-white px-4 py-2 rounded-md shadow-md border border-blue-700 w-[250px] md:w-86"
         >
         
          
              {/* 🔹 Search Icon */}
              <button type="submit" className="text-blue-700 mr-2 cursor-pointer">
                <FiSearch size={20} />
              </button>

              {/* 🔹 Input Field with Dynamic Placeholder */}
              <input
                type="text"
                placeholder={!isStopped ? "" : "Search..."}
                className="bg-transparent text-black outline-none w-full"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onFocus={() => setIsStopped(true)}
                onBlur={() => setIsStopped(false)}
              />

              {/* 🔹 Type Animation for Placeholder */}
              {!isStopped && (
                <TypeAnimation
                  sequence={categoryNames.flatMap((name) => [name, 1000, "", 500])}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-gray-400 text-sm cursor-pointer"
                />
              )}
            </form>
           )
          )}

          {/* 🔹 Right Side Icons with Spacing */}
          <div className="flex items-center space-x-6">
            
            {/* 🔹 Mobile Search Icon */}
            {!userInfo?.isAdmin && (
              <button onClick={() => setMobileSearchOpen(true)} className="md:hidden text-gray-700 hover:text-blue-600">
                <FiSearch size={24} />
              </button>
            )}

            {/* 🔹 Cart Icon */}
            {!userInfo?.isAdmin && (
              <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
                <FiShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2 py-1">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}

<div className="relative">
      {/* Show only if the user is logged in but NOT an admin */}
      {userInfo && !userInfo.isAdmin && (
        <div className="relative z-50">
          {/* Button with First Letter */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center"
          >
            {userInfo.name.charAt(0).toUpperCase()}
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul className="py-2">
                <li>
                  <Link
                    to="/profile"
                    onClick={closeDropdown} // Close dropdown when clicking Profile
                    className="block px-4 py-2 text-blue-700 hover:bg-gray-100 font-bold"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout(); // Call logout function
                      closeDropdown(); // Close dropdown
                    }}
                    className="w-full text-left px-4 py-2 text-blue-700 hover:bg-gray-100 font-bold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>

            {/* 🔹 Login / Profile Icon */}
            {!userInfo && !userInfo?.isAdmin && (
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                <FaSignInAlt size={24} />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* 🔹 Mobile Search Bar (Slides Down) */}
      {!userInfo?.isAdmin && (
        <div className={`transition-all duration-300 ease-in-out ${mobileSearchOpen ? "h-16 opacity-100" : "h-0 opacity-0"} overflow-hidden`}>
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white px-4 py-2 rounded-md shadow-md border border-gray-300 w-full max-w-md mx-auto"
          >
            {/* 🔹 Search Icon */}
            <button type="submit" className="text-gray-500 mr-2 cursor-pointer">
              <FiSearch size={20} />
            </button>

            {/* 🔹 Input Field with Dynamic Placeholder */}
            <input
              type="text"
              placeholder={!isStopped ? "" : "Search..."}
              className="bg-transparent text-black outline-none w-full"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onFocus={() => setIsStopped(true)}
              onBlur={() => setIsStopped(false)}
            />

            {/* 🔹 Close Icon (X) */}
            <button className="text-gray-500 ml-2 cursor-pointer" onClick={() => setMobileSearchOpen(false)}>
              <FiX size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Header;
