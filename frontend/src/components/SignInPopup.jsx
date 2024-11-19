import React, { useEffect, useRef, useState } from "react";
import { loginUser, registerUser } from "../services/userService";
import { toast } from "react-toastify";

const SignInPopup = ({ onSignIn, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const modalRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let userData;
      if (isSignUp) {
        // Handle Sign Up
        userData = await registerUser(username, email, password);
        toast.success("Sign Up successful!");
      } else {
        // Handle Sign In
        userData = await loginUser(email, password);
        toast.success("Login successful!");
      }
      onSignIn(userData);

      //close popup
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          `${isSignUp ? "Sign Up" : "Login"} failed!`
      );
    }
  };

  // Toggle In and Up
  const toggleForm = () => {
    // Switch the form
    setIsSignUp((prev) => !prev);
    //clearform
    setUsername("");
    setEmail("");
    setPassword("");
  };

  // Close modal when clicked outside the modal
  const clickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose(); // Close modal if clicked outside
    }
  };

  // Add event listener for outside click and cleanup on component unmount
  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={toggleForm}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Sign In
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span
                  onClick={toggleForm}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Sign Up
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPopup;
