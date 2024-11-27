import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../features/authSlice";
import SignInPopup from "./SignInPopup";
import { toast } from "react-toastify";
import { FaBars, FaSearch, FaVideo, FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toggleSidebar } from "../features/sidebarSlice";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [createChannelOpen, setCreateChannelOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [existingchannel, setexistingchannel] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  // Search functionality
  const handleSearch = () => {
    if (!query.trim()) {
      alert("Please enter a search term.");
      return;
    }
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Sign In / Sign Out
  const handleSignInClick = (userData) => {
    dispatch(setUser(userData));
    setPopupOpen(false);
  };

  const handleSignOut = () => {
    dispatch(logout());
  };

  // Sidebar toggle
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  // Create Channel

  const handleCreateChannel = async () => {
    try {
      const { channelconnect, avatar } = user;

      const response = await axios.post(
        "http://localhost:5000/channels/create",
        {
          channelName,
          description: channelDescription,
          channelconnect,
          avatar,
        }
      );

      if (response.status === 201) {
        toast.success("Channel created successfully!");
        setCreateChannelOpen(false);
        handleSignOut();
        toast.success("Login Again");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create channel");
    }
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white shadow-md">
      {/* Left Section: Hamburger Icon and Logo */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleToggleSidebar}
          className="p-2 hover:bg-gray-200 rounded-full"
        >
          <FaBars size={"18px"} />
        </button>
        <Link
          to={"/"}
          className="text-xl md:text-lg font-semibold text-gray-800 whitespace-nowrap"
        >
          YouTube
        </Link>
      </div>

      {/* Middle Section: Search Bar */}
      <div>
        <div className="hidden md:flex items-center flex-grow max-w-lg mx-4">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-grow h-10 px-4 rounded-l-full bg-gray-100 border border-gray-300 text-sm outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="h-10 px-4 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-full"
          >
            <FaSearch />
          </button>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="h-10 px-4 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-full"
          >
            <FaSearch />
          </button>
        </div>
        {isSearchOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setIsSearchOpen(false)}
          >
            <div
              className="bg-white p-6 rounded-lg w-full sm:w-96"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">Search</h2>
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full h-10 px-4 rounded-full bg-gray-100 border border-gray-300 text-sm outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSearch}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Section: Sign-In, Create Channel, Redirect */}
      <nav className="flex items-center space-x-4">
        {user && !user.channelId && (
          <button
            onClick={() => setCreateChannelOpen(true)}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <FaPlusCircle size={"20px"} />
          </button>
        )}
        {user && user.channelId && (
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <Link
              to={`/channels/${user.channelconnect}`}
              className="flex items-center"
            >
              <FaVideo size={"20px"} />
            </Link>
          </button>
        )}
        {user ? (
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
          >
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm hidden sm:inline">Sign Out</span>
          </button>
        ) : (
          <button
            onClick={() => setPopupOpen(true)}
            className="px-4 py-1 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
          >
            Sign In
          </button>
        )}
      </nav>

      {/* Create Channel Popup */}
      {createChannelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setCreateChannelOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-full sm:w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Create Channel</h2>
            <input
              type="text"
              placeholder="Channel Name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="w-full h-10 px-4 rounded-full bg-gray-100 border border-gray-300 text-sm outline-none focus:border-blue-500 mb-4"
            />
            <textarea
              placeholder="Channel Description"
              value={channelDescription}
              onChange={(e) => setChannelDescription(e.target.value)}
              className="w-full h-20 px-4 rounded-lg bg-gray-100 border border-gray-300 text-sm outline-none focus:border-blue-500"
            />
            <button
              onClick={handleCreateChannel}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </div>
      )}

      {/* Sign In Popup */}
      {isPopupOpen && (
        <SignInPopup
          onSignIn={handleSignInClick}
          onClose={() => setPopupOpen(false)}
        />
      )}
    </header>
  );
}

export default Header;
