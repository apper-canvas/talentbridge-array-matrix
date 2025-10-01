import jobsData from "@/services/mockData/jobListings.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const jobService = {
  async getAll() {
    await delay(300);
    return [...jobsData];
  },

  async getById(id) {
    await delay(200);
    const job = jobsData.find((j) => j.Id === parseInt(id));
    if (!job) throw new Error("Job not found");
    return { ...job };
  },

  async getByEmployerId(employerId) {
    await delay(300);
    return jobsData.filter((j) => j.employerId === employerId.toString());
  },

  async create(jobData) {
    await delay(400);
    const maxId = Math.max(...jobsData.map((j) => j.Id), 0);
    const newJob = {
      Id: maxId + 1,
      ...jobData,
      status: "active",
      postedAt: new Date().toISOString(),
    };
    jobsData.push(newJob);
    return { ...newJob };
  },

  async update(id, jobData) {
    await delay(300);
    const index = jobsData.findIndex((j) => j.Id === parseInt(id));
    if (index === -1) throw new Error("Job not found");
    jobsData[index] = { ...jobsData[index], ...jobData };
    return { ...jobsData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = jobsData.findIndex((j) => j.Id === parseInt(id));
    if (index === -1) throw new Error("Job not found");
    jobsData.splice(index, 1);
    return { success: true };
  },

  async updateStatus(id, status) {
    await delay(300);
    const index = jobsData.findIndex((j) => j.Id === parseInt(id));
    if (index === -1) throw new Error("Job not found");
    jobsData[index].status = status;
    return { ...jobsData[index] };
  },

  async search(filters) {
    await delay(300);
    let results = [...jobsData].filter((job) => job.status === "active");

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(keyword) ||
          job.description.toLowerCase().includes(keyword)
      );
    }

    if (filters.location) {
      results = results.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.category) {
      results = results.filter((job) => job.category === filters.category);
    }

    if (filters.experienceLevel) {
      results = results.filter(
        (job) => job.experienceLevel === filters.experienceLevel
      );
    }

    if (filters.employmentType) {
      results = results.filter(
        (job) => job.employmentType === filters.employmentType
      );
    }

    return results;
  },
};

export default jobService;