"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { queryClient } from "@/configs";
import { AuthProvider } from "@/contexts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
          <ToastContainer />
          </QueryClientProvider>
  );
};

export default App;
