import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import LandingPage from "@/components/pages/LandingPage";
import JobSeekerDashboard from "@/components/pages/JobSeekerDashboard";
import JobSearch from "@/components/pages/JobSearch";
import JobDetail from "@/components/pages/JobDetail";
import MyApplications from "@/components/pages/MyApplications";
import JobSeekerProfile from "@/components/pages/JobSeekerProfile";
import EmployerDashboard from "@/components/pages/EmployerDashboard";
import PostJob from "@/components/pages/PostJob";
import CandidateSearch from "@/components/pages/CandidateSearch";
import ApplicationManagement from "@/components/pages/ApplicationManagement";
import EmployerProfile from "@/components/pages/EmployerProfile";
import AdminDashboard from "@/components/pages/AdminDashboard";
import UserManagement from "@/components/pages/UserManagement";
import JobManagement from "@/components/pages/JobManagement";
import PlatformReports from "@/components/pages/PlatformReports";

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
          
          {/* Job Seeker Routes */}
          <Route path="jobseeker">
            <Route index element={<Navigate to="/jobseeker/dashboard" replace />} />
            <Route path="dashboard" element={<JobSeekerDashboard />} />
            <Route path="jobs" element={<JobSearch />} />
            <Route path="jobs/:id" element={<JobDetail />} />
            <Route path="applications" element={<MyApplications />} />
            <Route path="profile" element={<JobSeekerProfile />} />
          </Route>

          {/* Employer Routes */}
          <Route path="employer">
            <Route index element={<Navigate to="/employer/dashboard" replace />} />
            <Route path="dashboard" element={<EmployerDashboard />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="candidates" element={<CandidateSearch />} />
            <Route path="applications" element={<ApplicationManagement />} />
            <Route path="profile" element={<EmployerProfile />} />
          </Route>

          {/* Admin Routes */}
          <Route path="admin">
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="jobs" element={<JobManagement />} />
            <Route path="reports" element={<PlatformReports />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;