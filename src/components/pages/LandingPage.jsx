import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const LandingPage = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Active Jobs", value: "5,000+", icon: "Briefcase" },
    { label: "Companies", value: "1,200+", icon: "Building2" },
    { label: "Job Seekers", value: "50,000+", icon: "Users" },
    { label: "Success Stories", value: "8,500+", icon: "Award" },
  ];

  const features = [
    {
      icon: "Search",
      title: "Smart Job Matching",
      description: "AI-powered algorithms match you with the perfect opportunities based on your skills and preferences.",
    },
    {
      icon: "UserCheck",
      title: "Easy Application",
      description: "Apply to multiple jobs with one click using your saved profile and resume.",
    },
    {
      icon: "TrendingUp",
      title: "Career Growth",
      description: "Access career resources, salary insights, and professional development tools.",
    },
    {
      icon: "Shield",
      title: "Verified Companies",
      description: "All employers are verified to ensure authentic job postings and safe applications.",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Create Your Profile",
      description: "Build a comprehensive profile showcasing your skills, experience, and career goals.",
      icon: "UserPlus",
    },
    {
      step: "2",
      title: "Search & Apply",
      description: "Browse thousands of jobs and apply instantly with your saved profile and resume.",
      icon: "Search",
    },
    {
      step: "3",
      title: "Get Hired",
      description: "Connect with employers, attend interviews, and land your dream job.",
      icon: "Rocket",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-blue-600 to-accent text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Connect Talent with Opportunity
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              TalentBridge makes job searching and hiring simple, efficient, and successful for everyone.
            </p>
            
            {/* Role Selection Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card 
                hover 
                className="p-8 bg-white/10 backdrop-blur-md border-white/20 cursor-pointer"
                onClick={() => navigate("/jobseeker/dashboard")}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <ApperIcon name="User" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">I'm Looking for a Job</h3>
                <p className="text-blue-100 mb-4">Browse thousands of opportunities</p>
                <Button variant="secondary" className="bg-white text-primary hover:bg-blue-50">
                  Get Started
                  <ApperIcon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </Card>
              
              <Card 
                hover 
                className="p-8 bg-white/10 backdrop-blur-md border-white/20 cursor-pointer"
                onClick={() => navigate("/employer/dashboard")}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <ApperIcon name="Building2" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">I'm Hiring Talent</h3>
                <p className="text-blue-100 mb-4">Find qualified candidates fast</p>
                <Button variant="secondary" className="bg-white text-primary hover:bg-blue-50">
                  Post a Job
                  <ApperIcon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </Card>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                  <ApperIcon name={stat.icon} size={24} className="text-white" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why Choose TalentBridge?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We provide powerful tools and features to make your job search or hiring process seamless and successful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <ApperIcon name={feature.icon} size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Getting started is easy. Follow these simple steps to find your next opportunity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <Card hover className="p-8 text-center h-full">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <ApperIcon name={item.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.description}</p>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ApperIcon name="ArrowRight" size={32} className="text-accent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of job seekers and employers who trust TalentBridge to connect talent with opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/jobseeker/jobs")}
              className="bg-white text-primary hover:bg-blue-50"
            >
              <ApperIcon name="Search" size={20} className="mr-2" />
              Find Jobs
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate("/employer/post-job")}
              className="bg-gradient-to-r from-primary to-accent"
            >
              <ApperIcon name="Plus" size={20} className="mr-2" />
              Post a Job
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;