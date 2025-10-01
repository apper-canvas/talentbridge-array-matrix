const savedJobsService = {
  async getAll(candidateId = "1") {
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
          { field: { Name: "saved_at_c" } },
        ],
        where: [
          {
            FieldName: "candidate_id_c",
            Operator: "EqualTo",
            Values: [parseInt(candidateId)],
          },
        ],
      };

      const response = await apperClient.fetchRecords("saved_job_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching saved jobs:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async save(jobId, candidateId = "1") {
    try {
      const existing = await this.isSaved(jobId, candidateId);
      if (existing) {
        throw new Error("Job already saved");
      }

      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const params = {
        records: [
          {
            Name: `Saved Job ${jobId}`,
            job_id_c: parseInt(jobId),
            candidate_id_c: parseInt(candidateId),
            saved_at_c: new Date().toISOString(),
          },
        ],
      };

      const response = await apperClient.createRecord("saved_job_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter((r) => r.success);
        const failed = response.results.filter((r) => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to save job:`, failed);
          throw new Error(failed[0].message || "Failed to save job");
        }

        return successful[0]?.data;
      }
    } catch (error) {
      console.error("Error saving job:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async unsave(jobId, candidateId = "1") {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const findParams = {
        fields: [{ field: { Name: "Id" } }],
        where: [
          {
            FieldName: "job_id_c",
            Operator: "EqualTo",
            Values: [parseInt(jobId)],
          },
          {
            FieldName: "candidate_id_c",
            Operator: "EqualTo",
            Values: [parseInt(candidateId)],
          },
        ],
      };

      const findResponse = await apperClient.fetchRecords("saved_job_c", findParams);

      if (!findResponse.success) {
        console.error(findResponse.message);
        throw new Error(findResponse.message);
      }

      if (!findResponse.data || findResponse.data.length === 0) {
        throw new Error("Saved job not found");
      }

      const recordId = findResponse.data[0].Id;

      const deleteParams = {
        RecordIds: [parseInt(recordId)],
      };

      const deleteResponse = await apperClient.deleteRecord("saved_job_c", deleteParams);

      if (!deleteResponse.success) {
        console.error(deleteResponse.message);
        throw new Error(deleteResponse.message);
      }

      return { success: true };
    } catch (error) {
      console.error("Error unsaving job:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async isSaved(jobId, candidateId = "1") {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const params = {
        fields: [{ field: { Name: "Id" } }],
        where: [
          {
            FieldName: "job_id_c",
            Operator: "EqualTo",
            Values: [parseInt(jobId)],
          },
          {
            FieldName: "candidate_id_c",
            Operator: "EqualTo",
            Values: [parseInt(candidateId)],
          },
        ],
      };

      const response = await apperClient.fetchRecords("saved_job_c", params);

      if (!response.success) {
        console.error(response.message);
        return false;
      }

      return response.data && response.data.length > 0;
    } catch (error) {
      console.error("Error checking saved status:", error?.response?.data?.message || error);
      return false;
    }
  },
};

export default savedJobsService;