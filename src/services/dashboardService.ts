// src/services/dashboardService.ts
import api from '@/services/axios';

// 1. Summary Statistics
export const fetchDashboardStats = async () => {
  const response = await api.get('/dashboard/stats');
  return response.data;
};

// 2. Weekly Appointments Data (for chart)
export const fetchWeeklyAppointments = async () => {
  const response = await api.get('/dashboard/appointments/weekly');
  return response.data;
};

// 3. Appointment Status (Pie Chart)
export const fetchAppointmentStatus = async () => {
  const response = await api.get('/dashboard/appointments/status');
  return response.data;
};

// 4. Patient Satisfaction (Gauge)
export const fetchSatisfactionScore = async () => {
  const response = await api.get('/dashboard/satisfaction');
  return response.data;
};

// 5. Recent Appointments List
export const fetchRecentAppointments = async () => {
  const response = await api.get('/dashboard/appointments/recent');
  return response.data;
};

// 6. Recent Complaints List
export const fetchRecentComplaints = async () => {
  const response = await api.get('/dashboard/complaints/recent');
  return response.data;
};
