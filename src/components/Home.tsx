"use client";
import React, { useState } from "react";
import TextBox from "./TextBox";
import Header from "./Header";

const Home: React.FC = () => {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  return (
    <main className="min-h-dvh w-full bg-black text-white flex flex-col items-center justify-between" style={{ backgroundColor: "#090909" }}>
      <div className="w-full p-4 flex justify-center">
        <Header
          isHistoryModalOpen={isHistoryModalOpen}
          setIsHistoryModalOpen={setIsHistoryModalOpen}
        />
      </div>
      <div className="flex-1 flex items-center justify-center">
        {/* Page content can go here */}
      </div>
      <div className="w-full p-4 flex justify-center">
        <TextBox isHistoryModalOpen={isHistoryModalOpen} />
      </div>
    </main>
  );
};

export default Home; 