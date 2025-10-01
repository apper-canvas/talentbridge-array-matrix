import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import savedJobsService from "@/services/api/savedJobsService";
import jobService from "@/services/api/jobService";
import employerService from "@/services/api/employerService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

function SavedJobs() {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSavedJobs();
  }, []);

  const loadSavedJobs = async () => {
    try {
      setLoading(true);
      setError("");
      const saved = await savedJobsService.getAll("1");
      const jobIds = saved.map(s => s.jobId);
      
      if (jobIds.length === 0) {
        setSavedJobs([]);
        return;
      }

      const jobs = await jobService.getByIds(jobIds);
      
      const jobsWithEmployers = await Promise.all(
        jobs.map(async (job) => {
          const employer = await employerService.getByUserId(job.employerId);
          return { ...job, employer };
        })
      );

      setSavedJobs(jobsWithEmployers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (jobId, e) => {
    e.stopPropagation();
    try {
      await savedJobsService.unsave(jobId);
      setSavedJobs(prev => prev.filter(job => job.Id.toString() !== jobId.toString()));
      toast.success("Job removed from saved jobs");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const formatSalary = (min, max) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (savedJobs.length === 0) {
    return (
      <Empty
        icon="Bookmark"
        title="No Saved Jobs"
        description="You haven't saved any jobs yet. Start browsing to save jobs you're interested in."
        action={
          <Button onClick={() => navigate("/jobs")}>
            Browse Jobs
          </Button>
        }
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Saved Jobs</h1>
        <p className="text-slate-600">
          {savedJobs.length} {savedJobs.length === 1 ? "job" : "jobs"} saved for later
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedJobs.map((job) => (
          <Card
            key={job.Id}
            hover
            onClick={() => navigate(`/jobs/${job.Id}`)}
            className="p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                  <ApperIcon name="Building2" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 line-clamp-1">
                    {job.employer?.companyName || "Company"}
                  </h3>
                  <p className="text-sm text-slate-500">{job.location}</p>
                </div>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2">
              {job.title}
            </h2>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{job.employmentType}</Badge>
              <Badge variant="secondary">{job.experienceLevel}</Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <ApperIcon name="DollarSign" size={16} />
                <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <ApperIcon name="MapPin" size={16} />
                <span>{job.location}</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={(e) => handleUnsave(job.Id, e)}
            >
              <ApperIcon name="BookmarkX" size={16} className="mr-2" />
              Remove
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SavedJobs;