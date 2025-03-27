
import React from 'react';
import { Toaster } from "./components/ui/toaster.jsx";
import { Toaster as Sonner } from "./components/ui/sonner.jsx";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home.tsx";
import Auth from "./pages/Auth.tsx";
import Results from "./pages/Results.jsx";  // Updated import
import Leaderboard from "./pages/Leaderboard.jsx";
import RecyclingMap from "./pages/RecyclingMap.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import NotFound from "./pages/NotFound.jsx";
import Navbar from "./components/layout/Navbar.jsx";  // Updated from .js to .jsx
import Footer from "./components/layout/Footer.jsx";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-eco-green border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-eco-neutral-600">EcoSift Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/results" element={<Results />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/recycling-map" element={<RecyclingMap />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
