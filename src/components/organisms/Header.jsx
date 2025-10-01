import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import RoleIndicator from "@/components/molecules/RoleIndicator";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock current user - in production, this would come from auth context
  const currentUser = {
    role: location.pathname.includes("/admin") ? "admin" : 
          location.pathname.includes("/employer") ? "employer" : 
          location.pathname.includes("/jobseeker") ? "jobseeker" : null,
    name: "John Doe",
  };

  const getNavItems = () => {
    switch (currentUser.role) {
      case "jobseeker":
        return [
          { label: "Find Jobs", path: "/jobseeker/jobs", icon: "Briefcase" },
          { label: "My Applications", path: "/jobseeker/applications", icon: "FileText" },
          { label: "Profile", path: "/jobseeker/profile", icon: "User" },
        ];
      case "employer":
        return [
          { label: "Post Job", path: "/employer/post-job", icon: "Plus" },
          { label: "Candidates", path: "/employer/candidates", icon: "Users" },
          { label: "Applications", path: "/employer/applications", icon: "FileText" },
        ];
      case "admin":
        return [
          { label: "Dashboard", path: "/admin/dashboard", icon: "LayoutDashboard" },
          { label: "Users", path: "/admin/users", icon: "Users" },
          { label: "Jobs", path: "/admin/jobs", icon: "Briefcase" },
          { label: "Reports", path: "/admin/reports", icon: "BarChart" },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 backdrop-blur-lg bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
              <ApperIcon name="Zap" size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TalentBridge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-primary to-accent text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <ApperIcon name={item.icon} size={18} />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser.role && <RoleIndicator role={currentUser.role} />}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                  {currentUser.name.charAt(0)}
                </div>
                <ApperIcon name="ChevronDown" size={16} className="text-slate-600" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1">
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <ApperIcon name="User" size={16} />
                    Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <ApperIcon name="Settings" size={16} />
                    Settings
                  </button>
                  <hr className="my-1" />
                  <button 
                    onClick={() => navigate("/")}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <ApperIcon name="LogOut" size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          >
            <ApperIcon name={mobileMenuOpen ? "X" : "Menu"} size={24} className="text-slate-700" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-primary to-accent text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <ApperIcon name={item.icon} size={18} />
                  {item.label}
                </Link>
              ))}
              <hr className="my-2" />
              {currentUser.role && (
                <div className="px-4 py-2">
                  <RoleIndicator role={currentUser.role} />
                </div>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/");
                }}
                className="px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
              >
                <ApperIcon name="LogOut" size={18} />
                Sign Out
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;