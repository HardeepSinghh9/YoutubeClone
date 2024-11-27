import React from "react";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Feed />
    </div>
  );
}

export default App;
