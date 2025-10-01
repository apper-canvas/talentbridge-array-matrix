const jobSeekerService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "full_name_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "resume_url_c" } },
          { field: { Name: "skills_c" } },
          { field: { Name: "total_experience_years_c" } },
          { field: { Name: "user_id_c" } },
        ],
      };

      const response = await apperClient.fetchRecords("jobseeker_profile_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching jobseeker profiles:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "full_name_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "resume_url_c" } },
          { field: { Name: "skills_c" } },
          { field: { Name: "total_experience_years_c" } },
          { field: { Name: "user_id_c" } },
        ],
      };

      const response = await apperClient.getRecordById("jobseeker_profile_c", id, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching profile ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  async getByUserId(userId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "full_name_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "resume_url_c" } },
          { field: { Name: "skills_c" } },
          { field: { Name: "total_experience_years_c" } },
          { field: { Name: "user_id_c" } },
        ],
        where: [
          {
            FieldName: "user_id_c",
            Operator: "EqualTo",
            Values: [parseInt(userId)],
          },
        ],
      };

      const response = await apperClient.fetchRecords("jobseeker_profile_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data || response.data.length === 0) {
        throw new Error("Profile not found");
      }

      return response.data[0];
    } catch (error) {
      console.error("Error fetching profile by user ID:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async create(profileData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const record = {
        Name: profileData.Name || profileData.full_name_c,
        full_name_c: profileData.full_name_c,
        phone_c: profileData.phone_c,
        location_c: profileData.location_c,
        resume_url_c: profileData.resume_url_c,
        total_experience_years_c: profileData.total_experience_years_c,
        user_id_c: parseInt(profileData.user_id_c),
      };

      if (profileData.skills_c) {
        record.skills_c = Array.isArray(profileData.skills_c)
          ? profileData.skills_c.join(",")
          : profileData.skills_c;
      }

      const params = {
        records: [record],
      };

      const response = await apperClient.createRecord("jobseeker_profile_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter((r) => r.success);
        const failed = response.results.filter((r) => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create profile:`, failed);
          throw new Error(failed[0].message || "Failed to create profile");
        }

        return successful[0]?.data;
      }
    } catch (error) {
      console.error("Error creating profile:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, profileData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const updateData = { Id: parseInt(id) };
      if (profileData.Name !== undefined) updateData.Name = profileData.Name;
      if (profileData.full_name_c !== undefined) updateData.full_name_c = profileData.full_name_c;
      if (profileData.phone_c !== undefined) updateData.phone_c = profileData.phone_c;
      if (profileData.location_c !== undefined) updateData.location_c = profileData.location_c;
      if (profileData.resume_url_c !== undefined) updateData.resume_url_c = profileData.resume_url_c;
      if (profileData.total_experience_years_c !== undefined)
        updateData.total_experience_years_c = profileData.total_experience_years_c;
      if (profileData.user_id_c !== undefined) updateData.user_id_c = parseInt(profileData.user_id_c);
      if (profileData.skills_c !== undefined) {
        updateData.skills_c = Array.isArray(profileData.skills_c)
          ? profileData.skills_c.join(",")
          : profileData.skills_c;
      }

      const params = {
        records: [updateData],
      };

      const response = await apperClient.updateRecord("jobseeker_profile_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter((r) => r.success);
        const failed = response.results.filter((r) => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update profile:`, failed);
          throw new Error(failed[0].message || "Failed to update profile");
        }

        return successful[0]?.data;
      }
    } catch (error) {
      console.error("Error updating profile:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async search(filters) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const where = [];

      if (filters.skills && filters.skills.length > 0) {
        filters.skills.forEach((skill) => {
          where.push({
            FieldName: "skills_c",
            Operator: "Contains",
            Values: [skill],
          });
        });
      }

      if (filters.location) {
        where.push({
          FieldName: "location_c",
          Operator: "Contains",
          Values: [filters.location],
        });
      }

      if (filters.minExperience) {
        where.push({
          FieldName: "total_experience_years_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [filters.minExperience.toString()],
        });
      }

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "full_name_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "resume_url_c" } },
          { field: { Name: "skills_c" } },
          { field: { Name: "total_experience_years_c" } },
          { field: { Name: "user_id_c" } },
        ],
        where,
      };

      const response = await apperClient.fetchRecords("jobseeker_profile_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error searching profiles:", error?.response?.data?.message || error);
      throw error;
    }
  },
};
export default jobSeekerService;