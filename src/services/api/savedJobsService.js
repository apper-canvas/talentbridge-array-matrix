const STORAGE_KEY = "talentbridge_saved_jobs";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getSavedJobs = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const setSavedJobs = (jobs) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
};

const savedJobsService = {
  async getAll(candidateId = "1") {
    await delay(300);
    const savedJobs = getSavedJobs();
    return savedJobs.filter(job => job.candidateId === candidateId);
  },

  async save(jobId, candidateId = "1") {
    await delay(200);
    const savedJobs = getSavedJobs();
    const exists = savedJobs.find(
      job => job.jobId === jobId.toString() && job.candidateId === candidateId
    );
    
    if (exists) {
      throw new Error("Job already saved");
    }

    const newSavedJob = {
      Id: Date.now(),
      jobId: jobId.toString(),
      candidateId,
      savedAt: new Date().toISOString(),
    };

    savedJobs.push(newSavedJob);
    setSavedJobs(savedJobs);
    return { ...newSavedJob };
  },

  async unsave(jobId, candidateId = "1") {
    await delay(200);
    const savedJobs = getSavedJobs();
    const filtered = savedJobs.filter(
      job => !(job.jobId === jobId.toString() && job.candidateId === candidateId)
    );
    
    if (filtered.length === savedJobs.length) {
      throw new Error("Saved job not found");
    }

    setSavedJobs(filtered);
    return { success: true };
  },

  async isSaved(jobId, candidateId = "1") {
    await delay(100);
    const savedJobs = getSavedJobs();
    return savedJobs.some(
      job => job.jobId === jobId.toString() && job.candidateId === candidateId
    );
  },
};

export default savedJobsService;