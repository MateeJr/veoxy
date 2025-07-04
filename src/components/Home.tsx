import React from "react";
import TextBox from "./TextBox";

const Home: React.FC = () => {
  return (
    <main className="min-h-dvh w-full bg-black text-white flex flex-col items-center justify-between" style={{ backgroundColor: "#090909" }}>
      <div className="flex-1 flex items-center justify-center">
        {/* Page content can go here */}
      </div>
      <div className="w-full p-4 flex justify-center">
        <TextBox />
      </div>
    </main>
  );
};

export default Home; 