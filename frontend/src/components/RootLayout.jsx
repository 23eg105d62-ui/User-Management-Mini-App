import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-obsidian via-midnight to-obsidian text-cream flex flex-col relative overflow-hidden">
      {/* Visual Ambient Light Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-plum/20 blur-[150px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-mauve/15 blur-[150px] pointer-events-none animate-pulse-slow"></div>
      
      {/* Navigation Header */}
      <Header />
      
      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 relative z-10">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default RootLayout;