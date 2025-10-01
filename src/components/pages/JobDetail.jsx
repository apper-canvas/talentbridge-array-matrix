import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jobService from "@/services/api/jobService";
import employerService from "@/services/api/employerService";
import applicationService from "@/services/api/applicationService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Textarea from "@/components/atoms/Textarea";
import StatusPill from "@/components/molecules/StatusPill";
import { format } from "date-fns";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    loadJobDetails();
  }, [id]);

  const loadJobDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const jobData = await jobService.getById(id);
      const employerData = await employerService.getByUserId(jobData.employerId);
      setJob(jobData);
      setEmployer(employerData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!coverLetter.trim()) {
      toast.error("Please write a cover letter");
      return;
    }

    try {
      setApplying(true);
      await applicationService.create({
        jobId: job.Id.toString(),
        candidateId: "1", // Mock user ID
        coverLetter,
        resumeUrl: "/resumes/john-doe.pdf",
      });
      toast.success("Application submitted successfully!");
      setShowApplicationModal(false);
      setCoverLetter("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setApplying(false);
    }
  };

  const formatSalary = (min, max) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadJobDetails} />;
  if (!job) return <Error message="Job not found" />;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="tertiary"
          onClick={() => navigate("/jobseeker/jobs")}
          className="mb-6"
        >
          <ApperIcon name="ArrowLeft" size={18} className="mr-2" />
          Back to Jobs
        </Button>

        {/* Job Header */}
        <Card className="p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
              <ApperIcon name="Briefcase" size={36} className="text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
                  <p className="text-xl text-slate-600 flex items-center gap-2">
                    <ApperIcon name="Building2" size={20} />
                    {employer?.companyName || "Unknown Company"}
                  </p>
                </div>
                <StatusPill status={job.status} />
              </div>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="default" className="flex items-center gap-1">
                  <ApperIcon name="MapPin" size={16} />
                  {job.location}
                </Badge>
                <Badge variant="info" className="flex items-center gap-1">
                  <ApperIcon name="Clock" size={16} />
                  {job.employmentType.charAt(0).toUpperCase() + job.employmentType.slice(1)}
                </Badge>
                <Badge variant="success" className="flex items-center gap-1 text-base font-semibold">
                  <ApperIcon name="DollarSign" size={16} />
                  {formatSalary(job.salaryMin, job.salaryMax)}
                </Badge>
                <Badge variant="default">
                  {job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)} Level
                </Badge>
              </div>
              
              <div className="flex gap-3">
                <Button size="lg" onClick={() => setShowApplicationModal(true)}>
                  <ApperIcon name="Send" size={20} className="mr-2" />
                  Apply Now
                </Button>
                <Button variant="secondary" size="lg">
                  <ApperIcon name="Bookmark" size={20} className="mr-2" />
                  Save Job
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <ApperIcon name="FileText" size={20} />
                Job Description
              </h2>
              <p className="text-slate-600 whitespace-pre-line">{job.description}</p>
            </Card>

            {/* Requirements */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <ApperIcon name="CheckCircle" size={20} />
                Requirements
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ApperIcon name="Check" size={14} className="text-green-600" />
                    </div>
                    <span className="text-slate-700">{req}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <ApperIcon name="Gift" size={20} />
                  Benefits
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit, index) => (
                    <Badge key={index} variant="success" className="text-sm py-1.5 px-3">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            {employer && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <ApperIcon name="Building2" size={20} />
                  About Company
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Company Name</p>
                    <p className="font-medium text-slate-900">{employer.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Industry</p>
                    <p className="font-medium text-slate-900">{employer.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Company Size</p>
                    <p className="font-medium text-slate-900">{employer.companySize} employees</p>
                  </div>
                  {employer.verified && (
                    <Badge variant="success" className="flex items-center gap-1 w-fit">
                      <ApperIcon name="BadgeCheck" size={14} />
                      Verified Company
                    </Badge>
                  )}
                </div>
              </Card>
            )}

            {/* Job Info */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <ApperIcon name="Info" size={20} />
                Job Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Posted Date</p>
                  <p className="font-medium text-slate-900">
                    {format(new Date(job.postedAt), "MMMM dd, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Application Deadline</p>
                  <p className="font-medium text-slate-900">
                    {format(new Date(job.expiresAt), "MMMM dd, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Category</p>
                  <p className="font-medium text-slate-900">{job.category}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Apply for {job.title}</h2>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cover Letter <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Tell the employer why you're a great fit for this role..."
                  rows={8}
                  className="w-full"
                />
                <p className="text-sm text-slate-500 mt-1">
                  {coverLetter.length} characters
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <ApperIcon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-900 font-medium mb-1">Your resume will be attached automatically</p>
                    <p className="text-sm text-blue-700">We'll use the resume from your profile for this application.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-200 flex gap-3 justify-end">
              <Button
                variant="secondary"
                onClick={() => setShowApplicationModal(false)}
                disabled={applying}
              >
                Cancel
              </Button>
              <Button onClick={handleApply} disabled={applying}>
                {applying ? (
                  <>
                    <ApperIcon name="Loader" size={18} className="mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Send" size={18} className="mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default JobDetail;