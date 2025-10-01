const jobService = {
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
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "requirements_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "employment_type_c" } },
          { field: { Name: "experience_level_c" } },
          { field: { Name: "salary_min_c" } },
          { field: { Name: "salary_max_c" } },
          { field: { Name: "benefits_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "posted_at_c" } },
          { field: { Name: "expires_at_c" } },
          { field: { Name: "employer_id_c" } },
        ],
      };

      const response = await apperClient.fetchRecords("job_listing_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching jobs:", error?.response?.data?.message || error);
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
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "requirements_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "employment_type_c" } },
          { field: { Name: "experience_level_c" } },
          { field: { Name: "salary_min_c" } },
          { field: { Name: "salary_max_c" } },
          { field: { Name: "benefits_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "posted_at_c" } },
          { field: { Name: "expires_at_c" } },
          { field: { Name: "employer_id_c" } },
        ],
      };

      const response = await apperClient.getRecordById("job_listing_c", id, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      const job = response.data;
      if (job.requirements_c && typeof job.requirements_c === "string") {
        job.requirements = job.requirements_c.split(",").map((r) => r.trim());
      }
      if (job.benefits_c && typeof job.benefits_c === "string") {
        job.benefits = job.benefits_c.split(",").map((b) => b.trim());
      }

      return job;
    } catch (error) {
      console.error(`Error fetching job ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  async getByEmployerId(employerId) {
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
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "requirements_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "employment_type_c" } },
          { field: { Name: "experience_level_c" } },
          { field: { Name: "salary_min_c" } },
          { field: { Name: "salary_max_c" } },
          { field: { Name: "benefits_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "posted_at_c" } },
          { field: { Name: "expires_at_c" } },
          { field: { Name: "employer_id_c" } },
        ],
        where: [
          {
            FieldName: "employer_id_c",
            Operator: "EqualTo",
            Values: [parseInt(employerId)],
          },
        ],
      };

      const response = await apperClient.fetchRecords("job_listing_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching jobs by employer:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async create(jobData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const record = {
        Name: jobData.Name || jobData.title_c,
        title_c: jobData.title_c,
        description_c: jobData.description_c,
        category_c: jobData.category_c,
        location_c: jobData.location_c,
        employment_type_c: jobData.employment_type_c,
        experience_level_c: jobData.experience_level_c,
        salary_min_c: jobData.salary_min_c,
        salary_max_c: jobData.salary_max_c,
        status_c: jobData.status_c || "active",
        posted_at_c: jobData.posted_at_c || new Date().toISOString(),
        expires_at_c: jobData.expires_at_c,
        employer_id_c: parseInt(jobData.employer_id_c),
      };

      if (jobData.requirements_c) {
        record.requirements_c = Array.isArray(jobData.requirements_c)
          ? jobData.requirements_c.join(",")
          : jobData.requirements_c;
      }

      if (jobData.benefits_c) {
        record.benefits_c = Array.isArray(jobData.benefits_c)
          ? jobData.benefits_c.join(",")
          : jobData.benefits_c;
      }

      const params = {
        records: [record],
      };

      const response = await apperClient.createRecord("job_listing_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter((r) => r.success);
        const failed = response.results.filter((r) => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create job:`, failed);
          throw new Error(failed[0].message || "Failed to create job");
        }

        return successful[0]?.data;
      }
    } catch (error) {
      console.error("Error creating job:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, jobData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const updateData = { Id: parseInt(id) };
      if (jobData.Name !== undefined) updateData.Name = jobData.Name;
      if (jobData.title_c !== undefined) updateData.title_c = jobData.title_c;
      if (jobData.description_c !== undefined) updateData.description_c = jobData.description_c;
      if (jobData.category_c !== undefined) updateData.category_c = jobData.category_c;
      if (jobData.location_c !== undefined) updateData.location_c = jobData.location_c;
      if (jobData.employment_type_c !== undefined)
        updateData.employment_type_c = jobData.employment_type_c;
      if (jobData.experience_level_c !== undefined)
        updateData.experience_level_c = jobData.experience_level_c;
      if (jobData.salary_min_c !== undefined) updateData.salary_min_c = jobData.salary_min_c;
      if (jobData.salary_max_c !== undefined) updateData.salary_max_c = jobData.salary_max_c;
      if (jobData.status_c !== undefined) updateData.status_c = jobData.status_c;
      if (jobData.posted_at_c !== undefined) updateData.posted_at_c = jobData.posted_at_c;
      if (jobData.expires_at_c !== undefined) updateData.expires_at_c = jobData.expires_at_c;
      if (jobData.employer_id_c !== undefined)
        updateData.employer_id_c = parseInt(jobData.employer_id_c);

      if (jobData.requirements_c !== undefined) {
        updateData.requirements_c = Array.isArray(jobData.requirements_c)
          ? jobData.requirements_c.join(",")
          : jobData.requirements_c;
      }

      if (jobData.benefits_c !== undefined) {
        updateData.benefits_c = Array.isArray(jobData.benefits_c)
          ? jobData.benefits_c.join(",")
          : jobData.benefits_c;
      }

      const params = {
        records: [updateData],
      };

      const response = await apperClient.updateRecord("job_listing_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter((r) => r.success);
        const failed = response.results.filter((r) => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update job:`, failed);
          throw new Error(failed[0].message || "Failed to update job");
        }

        return successful[0]?.data;
      }
    } catch (error) {
      console.error("Error updating job:", error?.response?.data?.message || error);
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

      const response = await apperClient.deleteRecord("job_listing_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting job:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async updateStatus(id, status) {
    return await this.update(id, { status_c: status });
  },

  async search(filters) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
      });

      const where = [
        {
          FieldName: "status_c",
          Operator: "EqualTo",
          Values: ["active"],
        },
      ];

      if (filters.keyword) {
        where.push({
          FieldName: "title_c",
          Operator: "Contains",
          Values: [filters.keyword],
        });
      }

      if (filters.location) {
        where.push({
          FieldName: "location_c",
          Operator: "Contains",
          Values: [filters.location],
        });
      }

      if (filters.category) {
        where.push({
          FieldName: "category_c",
          Operator: "EqualTo",
          Values: [filters.category],
        });
      }

      if (filters.experienceLevel) {
        where.push({
          FieldName: "experience_level_c",
          Operator: "EqualTo",
          Values: [filters.experienceLevel],
        });
      }

      if (filters.employmentType) {
        where.push({
          FieldName: "employment_type_c",
          Operator: "EqualTo",
          Values: [filters.employmentType],
        });
      }

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "requirements_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "employment_type_c" } },
          { field: { Name: "experience_level_c" } },
          { field: { Name: "salary_min_c" } },
          { field: { Name: "salary_max_c" } },
          { field: { Name: "benefits_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "posted_at_c" } },
          { field: { Name: "expires_at_c" } },
          { field: { Name: "employer_id_c" } },
        ],
        where,
      };

      const response = await apperClient.fetchRecords("job_listing_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      const jobs = response.data || [];
      return jobs.map((job) => {
        if (job.requirements_c && typeof job.requirements_c === "string") {
          job.requirements = job.requirements_c.split(",").map((r) => r.trim());
        }
        if (job.benefits_c && typeof job.benefits_c === "string") {
          job.benefits = job.benefits_c.split(",").map((b) => b.trim());
        }
        return job;
      });
    } catch (error) {
      console.error("Error searching jobs:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async getByIds(ids) {
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
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "requirements_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "employment_type_c" } },
          { field: { Name: "experience_level_c" } },
          { field: { Name: "salary_min_c" } },
          { field: { Name: "salary_max_c" } },
          { field: { Name: "benefits_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "posted_at_c" } },
          { field: { Name: "expires_at_c" } },
          { field: { Name: "employer_id_c" } },
        ],
        where: [
          {
            FieldName: "Id",
            Operator: "ExactMatch",
            Values: ids.map((id) => parseInt(id)),
            Include: true,
          },
        ],
      };

      const response = await apperClient.fetchRecords("job_listing_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      const jobs = response.data || [];
      return jobs.map((job) => {
        if (job.requirements_c && typeof job.requirements_c === "string") {
          job.requirements = job.requirements_c.split(",").map((r) => r.trim());
        }
        if (job.benefits_c && typeof job.benefits_c === "string") {
          job.benefits = job.benefits_c.split(",").map((b) => b.trim());
        }
        return job;
      });
    } catch (error) {
      console.error("Error fetching jobs by IDs:", error?.response?.data?.message || error);
      throw error;
    }
  },
};
export default jobService;