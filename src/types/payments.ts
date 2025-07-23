import type { Key, ReactNode } from "react";

export type PaymentMethod = 'cash' | 'card' | 'mpesa';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface SanitizedPayment {
  id: Key | null | undefined;
  appointment_id: ReactNode;
  transaction_id: ReactNode;
  payment_date: any;
  total_amount: any;
  payment_status: string;
  payment_method: any;
  payment_id: number;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  created_at: string;
  appointment: {
    doctor_user: any;
    appointment_id: number;
    date: string;
    time: string;
    user?: {
      user_id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
    doctor?: {
      user_id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
  };
}

export interface CreatePaymentPayload {
  amount: number;
  method: PaymentMethod;
  appointmentId: number;
}
