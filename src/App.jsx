import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React from "react";
import LandingPage from "@/components/pages/LandingPage";
import JobSearch from "@/components/pages/JobSearch";
import JobDetail from "@/components/pages/JobDetail";
import Layout from "@/components/organisms/Layout";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
<Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          
          {/* Job Browsing Routes */}
          <Route path="jobs" element={<JobSearch />} />
          <Route path="jobs/:id" element={<JobDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;