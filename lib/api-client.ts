/**
 * HireLoop Frontend API Client
 * Interfaces with Express backend via Next.js rewrites (/api/v1)
 */

export interface JobFilterParams {
  q?: string;
  category?: string;
  type?: string;
  location?: string;
  minSalary?: number;
  maxSalary?: number;
  isRemote?: boolean;
  page?: number;
  limit?: number;
}

export interface ApplicationSubmitData {
  jobId: string;
  coverLetter?: string;
  resumeUrl?: string;
}

export interface CompanyRegisterData {
  name: string;
  industry: string;
  website?: string;
  location?: string;
  employeeCount?: string;
  logo?: string;
  description?: string;
}

export interface JobCreateData {
  title: string;
  category: string;
  type: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  location?: string;
  isRemote?: boolean;
  deadline?: string;
  responsibilities?: string;
  requirements?: string;
  benefits?: string;
}

export interface ApiJob {
  _id: string;
  title: string;
  slug: string;
  companyName: string;
  companyLogo: string;
  companyId: string;
  location: string;
  type: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  category: string;
  status: string;
  applicantsCount: number;
  createdAt: string;
}

export interface ApiCompany {
  _id: string;
  name: string;
  slug: string;
  logo: string;
  industry: string;
  location: string;
  employeeCount: string;
  website: string;
  status: string;
  description: string;
  openJobsCount?: number;
}

export interface ApiApplication {
  _id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  seekerName: string;
  seekerEmail: string;
  seekerAvatar: string;
  resumeUrl?: string;
  coverLetter?: string;
  status: "applied" | "under_review" | "shortlisted" | "rejected" | "offered";
  appliedAt: string;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "/api/v1";
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const res = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // forwards better-auth cookies
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
  }

  // Jobs
  async getJobs(params: JobFilterParams = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.append(key, String(value));
      }
    });
    return this.request<{
      success: boolean;
      data: ApiJob[];
      pagination: { page: number; limit: number; total: number; pages: number };
    }>(`/jobs?${query.toString()}`);
  }

  async getJob(id: string) {
    return this.request<{ success: boolean; data: ApiJob & { company?: ApiCompany } }>(
      `/jobs/${id}`
    );
  }

  async createJob(jobData: JobCreateData) {
    return this.request<{ success: boolean; data: ApiJob; message: string }>("/jobs", {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  }

  async getRecruiterJobs() {
    return this.request<{
      success: boolean;
      data: ApiJob[];
      limits: { plan: string; activeCount: number; maxAllowed: number; canPostMore: boolean };
    }>("/jobs/recruiter/my-jobs");
  }

  // Companies
  async getCompanies(query?: string, industry?: string) {
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (industry) params.append("industry", industry);
    return this.request<{ success: boolean; data: ApiCompany[] }>(
      `/companies?${params.toString()}`
    );
  }

  async getCompany(id: string) {
    return this.request<{
      success: boolean;
      data: ApiCompany & { openJobs?: ApiJob[] };
    }>(`/companies/${id}`);
  }

  async getMyCompany() {
    return this.request<{ success: boolean; data: ApiCompany | null }>("/companies/me");
  }

  async registerCompany(companyData: CompanyRegisterData) {
    return this.request<{ success: boolean; data: ApiCompany; message: string }>(
      "/companies",
      {
        method: "POST",
        body: JSON.stringify(companyData),
      }
    );
  }

  // Applications
  async applyJob(data: ApplicationSubmitData) {
    return this.request<{ success: boolean; data: ApiApplication; message: string }>(
      "/applications",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  async getMyApplications() {
    return this.request<{ success: boolean; data: ApiApplication[] }>(
      "/applications/my-applications"
    );
  }

  async getJobApplicants(jobId: string) {
    return this.request<{
      success: boolean;
      data: { job: { _id: string; title: string; companyName: string }; applicants: ApiApplication[] };
    }>(`/applications/job/${jobId}`);
  }

  async updateApplicantStatus(applicationId: string, status: string) {
    return this.request<{ success: boolean; message: string }>(
      `/applications/${applicationId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }
    );
  }

  // Saved Jobs
  async getSavedJobs() {
    return this.request<{
      success: boolean;
      data: Array<{ bookmarkId: string; savedAt: string; job: ApiJob | null }>;
    }>("/saved-jobs");
  }

  async saveJob(jobId: string) {
    return this.request<{ success: boolean; message: string }>(`/saved-jobs/${jobId}`, {
      method: "POST",
    });
  }

  async removeSavedJob(jobId: string) {
    return this.request<{ success: boolean; message: string }>(`/saved-jobs/${jobId}`, {
      method: "DELETE",
    });
  }

  // Analytics
  async getSeekerAnalytics() {
    return this.request<{
      success: boolean;
      stats: { savedJobs: number; applicationsSubmitted: number; interviewsScheduled: number; offersReceived: number };
      chartData: Array<{ name: string; value: number; fill: string }>;
      recentActivity: ApiApplication[];
    }>("/analytics/seeker");
  }

  async getRecruiterAnalytics() {
    return this.request<{
      success: boolean;
      stats: { totalJobPosts: number; activeJobs: number; jobsClosed: number; totalApplicants: number };
      chartData: Array<{ name: string; applicants: number }>;
      recentApplicants: ApiApplication[];
    }>("/analytics/recruiter");
  }

  async getAdminAnalytics() {
    return this.request<{
      success: boolean;
      stats: { totalUsers: number; totalRecruiters: number; totalCompanies: number; totalJobs: number; totalRevenue: number; monthlyRevenue: number };
      categoryChartData: Array<{ category: string; jobs: number }>;
      recentPayments: Array<{ transactionId: string; amount: number; userEmail: string; plan: string; createdAt: string }>;
    }>("/analytics/admin");
  }

  // User Profile
  async getProfile() {
    return this.request<{
      success: boolean;
      data: { id: string; name: string; email: string; role: string; plan: string; status: string; headline?: string; bio?: string; skills?: string[]; resumeUrl?: string };
    }>("/users/profile");
  }

  async updateProfile(updates: Record<string, unknown>) {
    return this.request<{ success: boolean; message: string }>("/users/profile", {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  }

  // Payments / Subscriptions
  async subscribePlan(plan: string) {
    return this.request<{ success: boolean; message: string; data: { transactionId: string; plan: string; amount: number } }>(
      "/payments/subscribe",
      {
        method: "POST",
        body: JSON.stringify({ plan }),
      }
    );
  }

  async getMyPayments() {
    return this.request<{
      success: boolean;
      currentPlan: string;
      data: Array<{ transactionId: string; plan: string; amount: number; createdAt: string; status: string }>;
    }>("/payments/my-payments");
  }
}

export const api = new ApiClient();
export default api;
