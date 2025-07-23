// File: src/components/PaymentTable.tsx
import React from 'react';
import type { SanitizedPayment } from '@/types/payments';

type PaymentTableProps = {
  payments: SanitizedPayment[];
};

const PaymentTable: React.FC<PaymentTableProps> = ({ payments }) => {
  if (!payments.length) return <p className="text-gray-500">No payments to display.</p>;

  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Method</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.payment_id} className="border-t">
              <td className="px-4 py-2">{payment.payment_id}</td>
              <td className="px-4 py-2">KES {(payment.amount ?? 0).toFixed(2)}</td>
              <td className="px-4 py-2 capitalize">{payment.payment_status}</td>
              <td className="px-4 py-2">{payment.payment_method}</td>
              <td className="px-4 py-2">
                {payment.payment_date
                  ? new Date(payment.payment_date).toLocaleDateString()
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
