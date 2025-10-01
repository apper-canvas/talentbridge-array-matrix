import applicationsData from "@/services/mockData/applications.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const applicationService = {
  async getAll() {
    await delay(300);
    return [...applicationsData];
  },

  async getById(id) {
    await delay(200);
    const application = applicationsData.find((a) => a.Id === parseInt(id));
    if (!application) throw new Error("Application not found");
    return { ...application };
  },

  async getByCandidateId(candidateId) {
    await delay(300);
    return applicationsData.filter(
      (a) => a.candidateId === candidateId.toString()
    );
  },

  async getByJobId(jobId) {
    await delay(300);
    return applicationsData.filter((a) => a.jobId === jobId.toString());
  },

  async create(applicationData) {
    await delay(400);
    const maxId = Math.max(...applicationsData.map((a) => a.Id), 0);
    const newApplication = {
      Id: maxId + 1,
      ...applicationData,
      status: "applied",
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    applicationsData.push(newApplication);
    return { ...newApplication };
  },

  async updateStatus(id, status) {
    await delay(300);
    const index = applicationsData.findIndex((a) => a.Id === parseInt(id));
    if (index === -1) throw new Error("Application not found");
    applicationsData[index] = {
      ...applicationsData[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    return { ...applicationsData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = applicationsData.findIndex((a) => a.Id === parseInt(id));
    if (index === -1) throw new Error("Application not found");
    applicationsData.splice(index, 1);
    return { success: true };
  },
};

export default applicationService;