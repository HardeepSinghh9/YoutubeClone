import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../features/authSlice";
import SignInPopup from "./SignInPopup";
import { toast } from "react-toastify";
import { FaBars, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

function Header() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  console.log({ user, token });

  const dispatch = useDispatch();

  const handleSignInClick = (userData) => {
    dispatch(setUser(userData));
    setPopupOpen(false);
    // toast.success("Login successful!");
  };

  const handleSignOut = () => {
    dispatch(logout());
    toast.success("logout successfull");
  };

  return (
    <header>
      <div>
        <button>
          <FaBars />
        </button>
      </div>
      <div>Youtube Clone</div>
      <div>
        <input type="text" placeholder="Search"></input>
        <button>
          <FaSearch />
        </button>
      </div>

      {/* sigin */}
      <div>
        {user ? (
          <button onClick={handleSignOut}>
            <img src={user.avatar} />
            Sign Out
          </button>
        ) : (
          <button onClick={() => setPopupOpen(true)}>Sign In</button>
        )}
      </div>
      {isPopupOpen && (
        <SignInPopup
          onSignIn={handleSignInClick}
          onClose={() => setPopupOpen(false)}
        ></SignInPopup>
      )}
    </header>
  );

  // return (
  //   <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white shadow-md">
  //     {/* Left Section: Hamburger Icon and Logo */}
  //     <div className="flex items-center space-x-4">
  //       <button className="text-xl p-2 hover:bg-gray-200 rounded-full">
  //         <FaBars />
  //       </button>
  //       <div className="text-xl md:text-2xl font-semibold text-gray-800 whitespace-nowrap">
  //         YouTube Clone
  //       </div>
  //     </div>

  //     {/* Middle Section: Search Bar */}
  //     <div className="hidden md:flex items-center flex-grow max-w-lg mx-4">
  //       <input
  //         type="text"
  //         placeholder="Search"
  //         className="flex-grow h-10 px-4 rounded-l-full bg-gray-100 border border-gray-300 text-sm outline-none focus:border-blue-500"
  //       />
  //       <button className="h-10 px-4 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-full">
  //         <FaSearch />
  //       </button>
  //     </div>

  //     {/* Right Section: Sign-In / Sign-Out Button */}
  //     <nav className="flex items-center space-x-4">
  //       {user ? (
  //         <button
  //           onClick={handleSignOut}
  //           className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
  //         >
  //           <img
  //             src={user.avatar}
  //             alt="User Avatar"
  //             className="w-6 h-6 rounded-full"
  //           />
  //           <span className="hidden sm:inline">Sign Out</span>
  //         </button>
  //       ) : (
  //         <button
  //           onClick={() => setPopupOpen(true)}
  //           className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
  //         >
  //           Sign In
  //         </button>
  //       )}
  //     </nav>

  //     {/* Sign In Popup */}
  //     {isPopupOpen && (
  //       <SignInPopup
  //         onSignIn={handleSignInClick}
  //         onClose={() => setPopupOpen(false)}
  //       />
  //     )}
  //   </header>
  // );
}
export default Header;
