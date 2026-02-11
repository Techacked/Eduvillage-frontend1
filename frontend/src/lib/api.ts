const API_BASE_URL = 'http://localhost:5000/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    let data;
    
    try {
      data = await response.json();
    } catch (e) {
      data = { message: 'Invalid response from server' };
    }

    if (!response.ok) {
      const errorMessage = data?.message || data?.error || 'An error occurred';
      console.error(`API Error [${response.status}]:`, errorMessage, data);
      throw new ApiError(response.status, errorMessage);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('Network error:', error);
    throw new ApiError(500, error instanceof Error ? error.message : 'Network error');
  }
}

export const api = {
  auth: {
    register: (userData: { name: string; email: string; password: string; role: string }) =>
      apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),

    login: (credentials: { email: string; password: string }) =>
      apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),

    getProfile: () => apiRequest('/auth/profile'),

    updateProfile: (userData: { name?: string; email?: string }) =>
      apiRequest('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(userData),
      }),
  },

  courses: {
    getAll: () => apiRequest('/courses'),
    getById: (id: string) => apiRequest(`/courses/${id}`),
    create: (courseData: any) => apiRequest('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    }),
    update: (id: string, courseData: any) => apiRequest(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    }),
    delete: (id: string) => apiRequest(`/courses/${id}`, {
      method: 'DELETE',
    }),
  },

  enrollments: {
    getAll: () => apiRequest('/enrollments'),
    create: (enrollmentData: any) => apiRequest('/enrollments', {
      method: 'POST',
      body: JSON.stringify(enrollmentData),
    }),
  },
};

export { ApiError };
