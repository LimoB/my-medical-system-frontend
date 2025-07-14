import { useState } from 'react';
import type { SanitizedPayment } from '@/types/payments';
import mpesaIcon from '@/assets/mpesa.png';
import stripeIcon from '@/assets/stripe.png';
import paypalIcon from '@/assets/paypal.png';
import cashIcon from '@/assets/cash.png';

interface Props {
  payments: SanitizedPayment[];
  onDelete: (id: number) => void;
  onView: (payment: SanitizedPayment) => void;
  deletingId: number | null;
}

const methodLabels: Record<string, string> = {
  mpesa: 'M-Pesa',
  stripe: 'Stripe',
  paypal: 'PayPal',
  cash: 'Cash',
};

const methodIcons: Record<string, string> = {
  mpesa: mpesaIcon,
  stripe: stripeIcon,
  paypal: paypalIcon,
  cash: cashIcon,
};

const PaymentTable = ({ payments, onDelete, onView, deletingId }: Props) => {
  const [filterMethod, setFilterMethod] = useState<string>('all');

  const filteredPayments =
    filterMethod === 'all'
      ? payments
      : payments.filter((p) => p.payment_method === filterMethod);

  const uniqueMethods = Array.from(
    new Set(payments.map((p) => p.payment_method).filter(Boolean))
  );

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100 bg-white">
      {/* Filter & Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b rounded-t-xl">
        <h2 className="text-lg font-semibold text-gray-700">💳 Payments</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="methodFilter" className="text-sm text-gray-600">
            Filter by method:
          </label>
          <select
            id="methodFilter"
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="all">All</option>
            {uniqueMethods.map((method) => (
              <option key={method} value={method}>
                {methodLabels[method] ?? method}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-blue-500 to-green-400">
          <tr>
            {['ID', 'Patient', 'Amount', 'Method', 'Status', 'Actions'].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filteredPayments.map((p) => (
            <tr
              key={p.payment_id}
              className="hover:bg-blue-50 transition cursor-pointer"
              onClick={() => onView(p)}
            >
              {/* Payment ID */}
              <td className="px-6 py-4 text-sm text-gray-800">{p.payment_id}</td>

              {/* Patient */}
              <td className="px-6 py-4 text-sm text-gray-700">
                {p.appointment?.user
                  ? `${p.appointment.user.first_name} ${p.appointment.user.last_name}`
                  : 'N/A'}
              </td>

              {/* Amount */}
              <td className="px-6 py-4 text-sm text-gray-700">KSh {p.amount}</td>

              {/* Method + Icon */}
              <td className="px-6 py-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  {methodIcons[p.payment_method] && (
                    <img
                      src={methodIcons[p.payment_method]}
                      alt={p.payment_method}
                      className="w-5 h-5"
                    />
                  )}
                  <span>{methodLabels[p.payment_method] ?? p.payment_method}</span>
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4 text-sm capitalize text-gray-700">
                {p.payment_status ?? 'N/A'}
              </td>

              {/* Delete Button */}
              <td className="px-6 py-4">
                <button
                  className={`text-sm px-2 py-1 rounded transition ${
                    deletingId === p.payment_id
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-red-600 hover:text-red-700 hover:underline'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(p.payment_id);
                  }}
                  disabled={deletingId === p.payment_id}
                >
                  {deletingId === p.payment_id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}

          {/* Empty State */}
          {filteredPayments.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-5 text-center text-gray-500 text-sm italic"
              >
                No payments found for the selected method.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
