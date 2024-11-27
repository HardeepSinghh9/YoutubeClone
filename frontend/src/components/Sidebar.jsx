// import React from "react";
// import {
//   FaHome,
//   FaFire,
//   FaMusic,
//   FaFilm,
//   FaBook,
//   FaGamepad,
// } from "react-icons/fa";
// import { SiYoutubeshorts } from "react-icons/si";
// import { FiShoppingCart } from "react-icons/fi";
// import { MdOutlineSubscriptions } from "react-icons/md";
// import { IoNewspaperOutline } from "react-icons/io5";
// import { IoIosRadio } from "react-icons/io";
// import { MdPodcasts } from "react-icons/md";
// import { FaDiscourse } from "react-icons/fa";
// import { GiHanger } from "react-icons/gi";
// import { GoTrophy } from "react-icons/go";
// import { useSelector, useDispatch } from "react-redux";
// import { closeSidebar } from "../features/sidebarSlice";

// function Sidebar() {
//   const sidebarItems = [
//     { id: 1, name: "Home", icon: <FaHome /> },
//     { id: 2, name: "Shorts", icon: <SiYoutubeshorts /> },
//     { id: 3, name: "Subscription", icon: <MdOutlineSubscriptions /> },
//     { id: 4, name: "Trending", icon: <FaFire /> },
//     { id: 5, name: "Shopping", icon: <FiShoppingCart /> },
//     { id: 6, name: "Music", icon: <FaMusic /> },
//     { id: 7, name: "Films", icon: <FaFilm /> },
//     { id: 8, name: "Education", icon: <FaBook /> },
//     { id: 9, name: "Gaming", icon: <FaGamepad /> },
//     { id: 10, name: "News", icon: <IoNewspaperOutline /> },
//     { id: 11, name: "Live", icon: <IoIosRadio /> },
//     { id: 12, name: "Podcasts", icon: <MdPodcasts /> },
//     { id: 13, name: "Sport", icon: <GoTrophy /> },
//     { id: 14, name: "Courses", icon: <FaDiscourse /> },
//     { id: 15, name: "Fashion", icon: <GiHanger /> },
//   ];

//   const isOpen = useSelector((state) => state.sidebar.isOpen);
//   const dispatch = useDispatch();

//   return (
//     <>
//       <div className="px-1 md:w-[25%] lg:w-[15%] xl:text-xl lg:text-sm overflow-y-scroll my-5 no-scrollbar overflow-x-hidden h-[calc(100vh-30px)]">
//         <div className="space-y-3 items-center">
//           {sidebarItems.map((item) => {
//             return (
//               <div
//                 key={item.name}
//                 className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-lg px-6 py-1"
//               >
//                 <div className="text-xl lg:text-sm cursor-pointer">
//                   {item.icon}
//                 </div>
//                 <span className="cursor-pointer">{item.name}</span>
//               </div>
//             );
//           })}
//         </div>
//         <br />
//         <hr />
//       </div>
//     </>
//   );
// }

// export default Sidebar;

import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaFire,
  FaMusic,
  FaFilm,
  FaBook,
  FaGamepad,
} from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineSubscriptions } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoIosRadio } from "react-icons/io";
import { MdPodcasts } from "react-icons/md";
import { FaDiscourse } from "react-icons/fa";
import { GiHanger } from "react-icons/gi";
import { GoTrophy } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { closeSidebar } from "../features/sidebarSlice";

function Sidebar() {
  const sidebarItems = [
    { id: 1, name: "Home", icon: <FaHome /> },
    { id: 2, name: "Shorts", icon: <SiYoutubeshorts /> },
    { id: 3, name: "Subscription", icon: <MdOutlineSubscriptions /> },
    { id: 4, name: "Trending", icon: <FaFire /> },
    { id: 5, name: "Shopping", icon: <FiShoppingCart /> },
    { id: 6, name: "Music", icon: <FaMusic /> },
    { id: 7, name: "Films", icon: <FaFilm /> },
    { id: 8, name: "Education", icon: <FaBook /> },
    { id: 9, name: "Gaming", icon: <FaGamepad /> },
    { id: 10, name: "News", icon: <IoNewspaperOutline /> },
    { id: 11, name: "Live", icon: <IoIosRadio /> },
    { id: 12, name: "Podcasts", icon: <MdPodcasts /> },
    { id: 13, name: "Sport", icon: <GoTrophy /> },
    { id: 14, name: "Courses", icon: <FaDiscourse /> },
    { id: 15, name: "Fashion", icon: <GiHanger /> },
  ];

  const isOpen = useSelector((state) => state.sidebar.isOpen);
  console.log("Sidebar Open Status: ", isOpen);

  const dispatch = useDispatch();

  return (
    <div
      className={`fixed top-13 left-0 h-full bg-white z-20 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:w-[25%] lg:w-[15%] 
        overflow-y-scroll no-scrollbar`}
    >
      {/* Close button for small screens */}
      <button
        className="md:hidden absolute top-4 right-4 p-2 text-gray-600"
        onClick={() => dispatch(closeSidebar())}
      >
        X
      </button>
      <div className="px-1 space-y-3 items-center my-5">
        {sidebarItems.map((item, index) => (
          <Link
            to={index === 0 ? "/" : item.Link}
            key={item.name}
            className="flex items-center space-x-6 hover:bg-gray-200 duration-300 rounded-lg px-6 py-1"
          >
            <div className="text-xl">{item.icon}</div>
            <span className={`cursor-pointer ${!isOpen && "hidden md:block"}`}>
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
