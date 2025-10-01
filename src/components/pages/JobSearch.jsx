import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jobService from "@/services/api/jobService";
import employerService from "@/services/api/employerService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import StatusPill from "@/components/molecules/StatusPill";
import Badge from "@/components/atoms/Badge";
import { format } from "date-fns";

const JobSearch = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    category: "",
    experienceLevel: "",
    employmentType: "",
  });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");
      const [jobsData, employersData] = await Promise.all([
        jobService.search(filters),
        employerService.getAll(),
      ]);
      setJobs(jobsData);
      setEmployers(employersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadJobs();
  };

  const getEmployerName = (employerId) => {
    const employer = employers.find((e) => e.userId === employerId);
    return employer ? employer.companyName : "Unknown Company";
  };

  const formatSalary = (min, max) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadJobs} />;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Find Your Next Opportunity</h1>
          <p className="text-slate-600">Browse {jobs.length} available positions</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Keywords
                </label>
                <Input
                  placeholder="Job title, skills..."
                  value={filters.keyword}
                  onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Location
                </label>
                <Input
                  placeholder="City, state..."
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Category
                </label>
                <Select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="">All Categories</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Operations">Operations</option>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Experience Level
                </label>
                <Select
                  value={filters.experienceLevel}
                  onChange={(e) => setFilters({ ...filters, experienceLevel: e.target.value })}
                >
                  <option value="">All Levels</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="executive">Executive</option>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Employment Type
                </label>
                <Select
                  value={filters.employmentType}
                  onChange={(e) => setFilters({ ...filters, employmentType: e.target.value })}
                >
                  <option value="">All Types</option>
                  <option value="fulltime">Full Time</option>
                  <option value="parttime">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button type="submit" className="w-full">
                  <ApperIcon name="Search" size={18} className="mr-2" />
                  Search Jobs
                </Button>
              </div>
            </div>
          </form>
        </Card>

        {/* Results */}
        {jobs.length === 0 ? (
          <Empty
            icon="Briefcase"
            title="No jobs found"
            description="Try adjusting your filters to see more results"
            actionLabel="Clear Filters"
            onAction={() => {
              setFilters({
                keyword: "",
                location: "",
                category: "",
                experienceLevel: "",
                employmentType: "",
              });
              loadJobs();
            }}
          />
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <Card
                key={job.Id}
                hover
                className="p-6 cursor-pointer"
                onClick={() => navigate(`/jobseeker/jobs/${job.Id}`)}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                        <ApperIcon name="Briefcase" size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-900 mb-1">
                          {job.title}
                        </h3>
                        <p className="text-slate-600 flex items-center gap-2">
                          <ApperIcon name="Building2" size={16} />
                          {getEmployerName(job.employerId)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mb-3">
                      <Badge variant="default" className="flex items-center gap-1">
                        <ApperIcon name="MapPin" size={14} />
                        {job.location}
                      </Badge>
                      <Badge variant="info" className="flex items-center gap-1">
                        <ApperIcon name="Briefcase" size={14} />
                        {job.employmentType.charAt(0).toUpperCase() + job.employmentType.slice(1)}
                      </Badge>
                      <Badge variant="success" className="flex items-center gap-1">
                        <ApperIcon name="DollarSign" size={14} />
                        {formatSalary(job.salaryMin, job.salaryMax)}
                      </Badge>
                      <Badge variant="default">
                        {job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)}
                      </Badge>
                    </div>
                    
                    <p className="text-slate-600 line-clamp-2 mb-3">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.slice(0, 3).map((req, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded"
                        >
                          {req}
                        </span>
                      ))}
                      {job.requirements.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">
                          +{job.requirements.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <StatusPill status={job.status} />
                    <p className="text-sm text-slate-500">
                      Posted {format(new Date(job.postedAt), "MMM dd, yyyy")}
                    </p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/jobseeker/jobs/${job.Id}`);
                      }}
                    >
                      View Details
                      <ApperIcon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearch;