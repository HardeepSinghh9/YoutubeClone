import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VideoDetail from "./components/VideoDetail";
import Header from "./components/Header";
import Search from "./components/Search";
import ChannelPage from "./components/channelPage";

const Root = () => (
  <div>
    <div className="sticky top-0 w-full z-40">
      <Header />
    </div>
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // Parent layout with the Header
    children: [
      {
        path: "/", // Root route (Feed + Sidebar)
        element: <App />,
      },
      {
        path: "video/:id", // Video detail route
        element: <VideoDetail />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "channels/:id",
        element: <ChannelPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
);
