const userService = {
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
          { field: { Name: "email_c" } },
          { field: { Name: "role_c" } },
          { field: { Name: "status_c" } },
        ],
      };

      const response = await apperClient.fetchRecords("user_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching users:", error?.response?.data?.message || error);
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
          { field: { Name: "email_c" } },
          { field: { Name: "role_c" } },
          { field: { Name: "status_c" } },
        ],
      };

      const response = await apperClient.getRecordById("user_c", id, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  async create(userData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const params = {
        records: [
          {
            Name: userData.Name || userData.email_c,
            email_c: userData.email_c,
            role_c: userData.role_c || "jobseeker",
            status_c: userData.status_c || "active",
          },
        ],
      };

      const response = await apperClient.createRecord("user_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter((r) => r.success);
        const failed = response.results.filter((r) => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create user:`, failed);
          throw new Error(failed[0].message || "Failed to create user");
        }

        return successful[0]?.data;
      }
    } catch (error) {
      console.error("Error creating user:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, userData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const updateData = { Id: parseInt(id) };
      if (userData.Name !== undefined) updateData.Name = userData.Name;
      if (userData.email_c !== undefined) updateData.email_c = userData.email_c;
      if (userData.role_c !== undefined) updateData.role_c = userData.role_c;
      if (userData.status_c !== undefined) updateData.status_c = userData.status_c;

      const params = {
        records: [updateData],
      };

      const response = await apperClient.updateRecord("user_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter((r) => r.success);
        const failed = response.results.filter((r) => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update user:`, failed);
          throw new Error(failed[0].message || "Failed to update user");
        }

        return successful[0]?.data;
      }
    } catch (error) {
      console.error("Error updating user:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const params = {
        RecordIds: [parseInt(id)],
      };

      const response = await apperClient.deleteRecord("user_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting user:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async updateStatus(id, status) {
    return await this.update(id, { status_c: status });
  },
};

export default userService;