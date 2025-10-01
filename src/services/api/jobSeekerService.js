import profilesData from "@/services/mockData/jobseekerProfiles.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const jobSeekerService = {
  async getAll() {
    await delay(300);
    return [...profilesData];
  },

  async getById(id) {
    await delay(200);
    const profile = profilesData.find((p) => p.Id === parseInt(id));
    if (!profile) throw new Error("Profile not found");
    return { ...profile };
  },

  async getByUserId(userId) {
    await delay(200);
    const profile = profilesData.find((p) => p.userId === userId.toString());
    if (!profile) throw new Error("Profile not found");
    return { ...profile };
  },

  async create(profileData) {
    await delay(400);
    const maxId = Math.max(...profilesData.map((p) => p.Id), 0);
    const newProfile = {
      Id: maxId + 1,
      ...profileData,
    };
    profilesData.push(newProfile);
    return { ...newProfile };
  },

  async update(id, profileData) {
    await delay(300);
    const index = profilesData.findIndex((p) => p.Id === parseInt(id));
    if (index === -1) throw new Error("Profile not found");
    profilesData[index] = { ...profilesData[index], ...profileData };
    return { ...profilesData[index] };
  },

  async search(filters) {
    await delay(300);
    let results = [...profilesData];

    if (filters.skills && filters.skills.length > 0) {
      results = results.filter((profile) =>
        filters.skills.some((skill) =>
          profile.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))
        )
      );
    }

    if (filters.location) {
      results = results.filter((profile) =>
        profile.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minExperience) {
      results = results.filter(
        (profile) => profile.totalExperienceYears >= filters.minExperience
      );
    }

    return results;
  },
};

export default jobSeekerService;