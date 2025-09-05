import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// About Content
export const aboutApi = {
  getContent: () => api.get('/about'),
  updateContent: (data: any) => api.put('/about', data),
};

// Projects
export const projectsApi = {
  getAll: () => api.get('/projects'),
  getById: (id: string) => api.get(`/projects/${id}`),
  create: (data: any) => api.post('/projects', data),
  update: (id: string, data: any) => api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
};

// Events
export const eventsApi = {
  getAll: () => api.get('/events'),
  getById: (id: string) => api.get(`/events/${id}`),
  create: (data: any) => api.post('/events', data),
  update: (id: string, data: any) => api.put(`/events/${id}`, data),
  delete: (id: string) => api.delete(`/events/${id}`),
};

// Blog
export const blogApi = {
  getAll: () => api.get('/blog'),
  getById: (id: string) => api.get(`/blog/${id}`),
  create: (data: any) => api.post('/blog', data),
  update: (id: string, data: any) => api.put(`/blog/${id}`, data),
  delete: (id: string) => api.delete(`/blog/${id}`),
};

// Team
export const teamApi = {
  getAll: () => api.get('/team'),
  getById: (id: string) => api.get(`/team/${id}`),
  create: (data: any) => api.post('/team', data),
  update: (id: string, data: any) => api.put(`/team/${id}`, data),
  delete: (id: string) => api.delete(`/team/${id}`),
};

// Contact
export const contactApi = {
  submitMessage: (data: any) => api.post('/contact', data),
  getMessages: () => api.get('/contact'),
  updateMessage: (id: string, data: any) => api.put(`/contact/${id}`, data),
  deleteMessage: (id: string) => api.delete(`/contact/${id}`),
};

// Website Requests
export const websiteRequestsApi = {
  submit: (data: any) => api.post('/website-requests', data),
  getAll: () => api.get('/website-requests'),
  getById: (id: string) => api.get(`/website-requests/${id}`),
  update: (id: string, data: any) => api.put(`/website-requests/${id}`, data),
  delete: (id: string) => api.delete(`/website-requests/${id}`),
};

// File Upload
export const uploadApi = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadMultiple: (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    return api.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;