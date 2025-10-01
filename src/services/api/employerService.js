import profilesData from "@/services/mockData/employerProfiles.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const employerService = {
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
      verified: false,
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

  async verify(id) {
    await delay(300);
    const index = profilesData.findIndex((p) => p.Id === parseInt(id));
    if (index === -1) throw new Error("Profile not found");
    profilesData[index].verified = true;
    return { ...profilesData[index] };
  },
};

export default employerService;