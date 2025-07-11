// File: src/types/dashboard.ts
import type { LucideIcon } from 'lucide-react';

// 🟢 Dashboard Stat Card Item
export interface StatItem {
  label: string;
  value: number | string;
  icon: LucideIcon;
  gradient: string;
}

// 📊 Weekly Appointments Chart Item
export interface ChartDataItem {
  name: string;           // e.g. "Mon", "Tue"
  appointments: number;
}

// 🥧 Appointment Status Pie Chart Item
export interface PieDataItem {
  name: string;           // e.g. "Completed", "Pending"
  value: number;
}

// 🟠 Patient Satisfaction Gauge Item
export interface GaugeDataItem {
  name: string;           // Usually "Satisfaction"
  value: number;          // Score, e.g. 78
  fill: string;           // Color
}

// 🗓️ Recent Appointment Item
export interface Appointment {
  patient: string;
  doctor: string;
  date: string;           // e.g. "8 July"
  time: string;           // e.g. "10:30 AM"
  status: 'Confirmed' | 'Pending' | string;
  created_at?: string;    // Optional timestamp
}

// 🧾 Recent Complaint Item
export interface Complaint {
  patient: string;
  issue: string;
  status: 'Open' | 'In Progress' | string;
  created_at?: string;    // Optional timestamp for sorting/labeling
  assigned_to?: string;   // Optional name of the admin/doctor handling
}
