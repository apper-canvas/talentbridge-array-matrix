import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  const footerLinks = {
    "For Job Seekers": [
      { label: "Browse Jobs", path: "/jobseeker/jobs" },
      { label: "Career Advice", path: "#" },
      { label: "Resume Tips", path: "#" },
      { label: "Salary Guide", path: "#" },
    ],
    "For Employers": [
      { label: "Post a Job", path: "/employer/post-job" },
      { label: "Search Candidates", path: "/employer/candidates" },
      { label: "Pricing", path: "#" },
      { label: "Resources", path: "#" },
    ],
    Company: [
      { label: "About Us", path: "#" },
      { label: "Contact", path: "#" },
      { label: "Careers", path: "#" },
      { label: "Blog", path: "#" },
    ],
    Legal: [
      { label: "Privacy Policy", path: "#" },
      { label: "Terms of Service", path: "#" },
      { label: "Cookie Policy", path: "#" },
      { label: "Disclaimer", path: "#" },
    ],
  };

  const socialLinks = [
    { icon: "Linkedin", url: "#" },
    { icon: "Twitter", url: "#" },
    { icon: "Facebook", url: "#" },
    { icon: "Instagram", url: "#" },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg">
                <ApperIcon name="Zap" size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold">TalentBridge</span>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Connecting talent with opportunity through intelligent job matching and streamlined hiring.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.url}
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-primary hover:to-accent transition-all duration-200"
                >
                  <ApperIcon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © 2024 TalentBridge. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
              Privacy
            </Link>
            <Link to="#" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
              Terms
            </Link>
            <Link to="#" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;