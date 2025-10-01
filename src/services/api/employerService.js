const employerService = {
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
          { field: { Name: "company_name_c" } },
          { field: { Name: "industry_c" } },
          { field: { Name: "company_size_c" } },
          { field: { Name: "website_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "verified_c" } },
          { field: { Name: "user_id_c" } },
        ],
      };

      const response = await apperClient.fetchRecords("employer_profile_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching employer profiles:", error?.response?.data?.message || error);
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
          { field: { Name: "company_name_c" } },
          { field: { Name: "industry_c" } },
          { field: { Name: "company_size_c" } },
          { field: { Name: "website_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "verified_c" } },
          { field: { Name: "user_id_c" } },
        ],
      };

      const response = await apperClient.getRecordById("employer_profile_c", id, params);

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
          { field: { Name: "company_name_c" } },
          { field: { Name: "industry_c" } },
          { field: { Name: "company_size_c" } },
          { field: { Name: "website_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "verified_c" } },
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

      const response = await apperClient.fetchRecords("employer_profile_c", params);

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

      const params = {
        records: [
          {
            Name: profileData.Name || profileData.company_name_c,
            company_name_c: profileData.company_name_c,
            industry_c: profileData.industry_c,
            company_size_c: profileData.company_size_c,
            website_c: profileData.website_c,
            description_c: profileData.description_c,
            location_c: profileData.location_c,
            verified_c: false,
            user_id_c: parseInt(profileData.user_id_c),
          },
        ],
      };

      const response = await apperClient.createRecord("employer_profile_c", params);

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
      if (profileData.company_name_c !== undefined)
        updateData.company_name_c = profileData.company_name_c;
      if (profileData.industry_c !== undefined) updateData.industry_c = profileData.industry_c;
      if (profileData.company_size_c !== undefined)
        updateData.company_size_c = profileData.company_size_c;
      if (profileData.website_c !== undefined) updateData.website_c = profileData.website_c;
      if (profileData.description_c !== undefined)
        updateData.description_c = profileData.description_c;
      if (profileData.location_c !== undefined) updateData.location_c = profileData.location_c;
      if (profileData.verified_c !== undefined) updateData.verified_c = profileData.verified_c;
      if (profileData.user_id_c !== undefined) updateData.user_id_c = parseInt(profileData.user_id_c);

      const params = {
        records: [updateData],
      };

      const response = await apperClient.updateRecord("employer_profile_c", params);

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

  async verify(id) {
    return await this.update(id, { verified_c: true });
  },
};

export default employerService;