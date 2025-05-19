import { Job } from '../types/job';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const jobService = {
  // Create a new job
  async createJob(jobData: Omit<Job, 'id'>): Promise<Job> {
    const response = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });
    if (!response.ok) {
      throw new Error('Failed to create job');
    }
    return response.json();
  },

  // Get all jobs
  async getAllJobs(): Promise<Job[]> {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    return response.json();
  },

  // Get a single job by ID
  async getJobById(id: string): Promise<Job> {
    const response = await fetch(`${API_URL}/jobs/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch job');
    }
    return response.json();
  },

  // Update a job
  async updateJob(id: string, jobData: Partial<Job>): Promise<Job> {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });
    if (!response.ok) {
      throw new Error('Failed to update job');
    }
    return response.json();
  },

  // Delete a job
  async deleteJob(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete job');
    }
  },
}; 