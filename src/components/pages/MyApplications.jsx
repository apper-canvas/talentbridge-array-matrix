import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import applicationService from "@/services/api/applicationService";
import jobService from "@/services/api/jobService";
import employerService from "@/services/api/employerService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import StatusPill from "@/components/molecules/StatusPill";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

function MyApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");
      const apps = await applicationService.getByCandidateId("1");

      const appsWithDetails = await Promise.all(
        apps.map(async (app) => {
          const jobId = app.job_id_c?.Id || app.job_id_c;
          const job = await jobService.getById(jobId);
          const employerId = job.employer_id_c?.Id || job.employer_id_c;
          const employer = await employerService.getByUserId(employerId);
          return { ...app, job, employer };
        })
      );

      const sorted = appsWithDetails.sort(
        (a, b) => new Date(b.applied_at_c) - new Date(a.applied_at_c)
      );
      setApplications(sorted);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (applications.length === 0) {
    return (
      <Empty
        icon="FileText"
        title="No Applications Yet"
        description="You haven't applied to any jobs yet. Start browsing to find your next opportunity."
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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Applications</h1>
        <p className="text-slate-600">
          {applications.length} {applications.length === 1 ? "application" : "applications"} submitted
        </p>
      </div>

      <div className="space-y-4">
{applications.map((application) => (
          <Card
            key={application.Id}
            hover
            onClick={() => navigate(`/jobs/${application.job_id_c?.Id || application.job_id_c}`)}
            className="p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <ApperIcon name="Building2" size={28} className="text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-1">
                        {application.job?.title_c || application.job?.Name}
                      </h3>
                      <p className="text-slate-600 font-medium">
                        {application.employer?.company_name_c || "Unknown Company"}
                      </p>
                    </div>
                    <StatusPill status={application.status_c} />
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-2">
                      <ApperIcon name="MapPin" size={16} />
                      <span>{application.job?.location_c}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ApperIcon name="Briefcase" size={16} />
                      <span>{application.job?.employment_type_c}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ApperIcon name="Calendar" size={16} />
                      <span>Applied {format(new Date(application.applied_at_c), "MMM d, yyyy")}</span>
                    </div>
                  </div>

                  {application.cover_letter_c && (
                    <div className="bg-slate-50 rounded-lg p-4 mb-3">
                      <p className="text-sm font-medium text-slate-700 mb-2">Cover Letter:</p>
                      <p className="text-sm text-slate-600 line-clamp-3">
                        {application.cover_letter_c}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/jobs/${application.job_id_c?.Id || application.job_id_c}`);
                      }}
                    >
                      View Job Details
                    </Button>
                    {application.resume_url_c && (
                      <a
                        href={application.resume_url_c}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <ApperIcon name="FileText" size={14} />
                        View Resume
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MyApplications;