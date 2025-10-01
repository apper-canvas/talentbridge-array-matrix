const applicationService = {
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
          { field: { Name: "job_id_c" } },
          { field: { Name: "candidate_id_c" } },
          { field: { Name: "cover_letter_c" } },
          { field: { Name: "resume_url_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "applied_at_c" } },
          { field: { Name: "updated_at_c" } },
        ],
      };

      const response = await apperClient.fetchRecords("application_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching applications:", error?.response?.data?.message || error);
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
          { field: { Name: "job_id_c" } },
          { field: { Name: "candidate_id_c" } },
          { field: { Name: "cover_letter_c" } },
          { field: { Name: "resume_url_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "applied_at_c" } },
          { field: { Name: "updated_at_c" } },
        ],
      };

      const response = await apperClient.getRecordById("application_c", id, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching application ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  async getByCandidateId(candidateId) {
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
          { field: { Name: "job_id_c" } },
          { field: { Name: "candidate_id_c" } },
          { field: { Name: "cover_letter_c" } },
          { field: { Name: "resume_url_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "applied_at_c" } },
          { field: { Name: "updated_at_c" } },
        ],
        where: [
          {
            FieldName: "candidate_id_c",
            Operator: "EqualTo",
            Values: [parseInt(candidateId)],
          },
        ],
      };

      const response = await apperClient.fetchRecords("application_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching applications by candidate:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async getByJobId(jobId) {
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
          { field: { Name: "job_id_c" } },
          { field: { Name: "candidate_id_c" } },
          { field: { Name: "cover_letter_c" } },
          { field: { Name: "resume_url_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "applied_at_c" } },
          { field: { Name: "updated_at_c" } },
        ],
        where: [
          {
            FieldName: "job_id_c",
            Operator: "EqualTo",
            Values: [parseInt(jobId)],
          },
        ],
      };

      const response = await apperClient.fetchRecords("application_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching applications by job:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async create(applicationData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const params = {
        records: [
          {
            Name: applicationData.Name || `Application for Job ${applicationData.job_id_c}`,
            job_id_c: parseInt(applicationData.job_id_c || applicationData.jobId),
            candidate_id_c: parseInt(applicationData.candidate_id_c || applicationData.candidateId),
            cover_letter_c: applicationData.cover_letter_c || applicationData.coverLetter,
            resume_url_c: applicationData.resume_url_c || applicationData.resumeUrl,
            status_c: applicationData.status_c || "applied",
            applied_at_c: applicationData.applied_at_c || new Date().toISOString(),
            updated_at_c: applicationData.updated_at_c || new Date().toISOString(),
          },
        ],
      };

      const response = await apperClient.createRecord("application_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter((r) => r.success);
        const failed = response.results.filter((r) => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create application:`, failed);
          throw new Error(failed[0].message || "Failed to create application");
        }

        return successful[0]?.data;
      }
    } catch (error) {
      console.error("Error creating application:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async updateStatus(id, status) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const params = {
        records: [
          {
            Id: parseInt(id),
            status_c: status,
            updated_at_c: new Date().toISOString(),
          },
        ],
      };

      const response = await apperClient.updateRecord("application_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter((r) => r.success);
        const failed = response.results.filter((r) => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update application:`, failed);
          throw new Error(failed[0].message || "Failed to update application");
        }

        return successful[0]?.data;
      }
    } catch (error) {
      console.error("Error updating application status:", error?.response?.data?.message || error);
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

      const response = await apperClient.deleteRecord("application_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting application:", error?.response?.data?.message || error);
      throw error;
    }
  },
};

export default applicationService;