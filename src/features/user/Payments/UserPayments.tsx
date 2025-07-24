import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { jsPDF } from 'jspdf';
import type { RootState } from '@/store/store';
import { fetchPaymentsByUserId } from '@/services/payments';
import type { SanitizedPayment } from '@/types/payments';
import { formatDate } from '@/utils/formatDate';

const UserPayments = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [payments, setPayments] = useState<SanitizedPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortKey, setSortKey] = useState<'created_at' | 'amount' | 'payment_status'>('created_at');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Paid' | 'Pending' | 'Failed'>('All');

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchPaymentsByUserId(userId);
        setPayments(data);
      } catch {
        setError('Failed to load payments');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const filteredPayments = payments
    .filter((p) => filterStatus === 'All' || p.payment_status === filterStatus)
    .sort((a, b) => {
      if (sortKey === 'created_at') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortKey === 'amount') {
        return Number(b.amount) - Number(a.amount);
      } else {
        return a.payment_status.localeCompare(b.payment_status);
      }
    });

  const exportCSV = () => {
    const headers = ['Date', 'Amount', 'Transaction ID', 'Status'];
    const rows = filteredPayments.map((p) => [
      formatDate(p.created_at),
      `$${Number(p.amount).toFixed(2)}`,
      p.transaction_id || 'N/A',
      p.payment_status,
    ]);

    const csvContent =
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'payments.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Payment History', 14, 16);
    filteredPayments.forEach((p, i) => {
      const y = 30 + i * 10;
      doc.text([
        `${formatDate(p.created_at)}`,
        `$${Number(p.amount).toFixed(2)}`,
        `${p.transaction_id || 'N/A'}`,
        `${p.payment_status}`
      ].join(' | '), 14, y);
    });
    doc.save('payments.pdf');
  };

  if (loading) return <div className="p-6 text-gray-500 text-center">Loading payments...</div>;
  if (error) return <div className="p-6 text-red-600 text-center">{error}</div>;

  return (
    <div className="w-full px-4 py-6 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Payment History</h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex gap-3 items-center">
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as any)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="created_at">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="payment_status">Sort by Status</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={exportCSV}
            className="bg-teal-600 text-white px-3 py-2 rounded text-sm hover:bg-teal-700"
          >
            Export CSV
          </button>
          <button
            onClick={exportPDF}
            className="bg-indigo-600 text-white px-3 py-2 rounded text-sm hover:bg-indigo-700"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="space-y-4 md:hidden">
        {filteredPayments.map((payment) => (
          <div key={payment.payment_id} className="border rounded-md p-4 bg-white shadow-sm">
            <div className="text-sm text-gray-600">Date: {formatDate(payment.created_at)}</div>
            <div className="text-sm text-gray-800 font-semibold">Amount: ${Number(payment.amount).toFixed(2)}</div>
            <div className="text-xs font-mono break-all mt-1">
              TXN: {payment.transaction_id || 'N/A'}
            </div>
            <div className="mt-2">
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
                  ${payment.payment_status === 'Paid'
                    ? 'bg-green-100 text-green-800'
                    : payment.payment_status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-200 text-gray-800'}
                `}
              >
                {payment.payment_status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-[700px] w-full border border-gray-200 bg-white rounded-lg shadow-md text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Amount</th>
              <th className="py-3 px-4 border-b">Transaction ID</th>
              <th className="py-3 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => (
              <tr key={payment.payment_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-3 px-4 border-b">{formatDate(payment.created_at)}</td>
                <td className="py-3 px-4 border-b text-green-700 font-medium">
                  ${Number(payment.amount).toFixed(2)}
                </td>
                <td className="py-3 px-4 border-b font-mono text-xs break-all max-w-[220px]">
                  {payment.transaction_id || 'N/A'}
                </td>
                <td className="py-3 px-4 border-b">
                  <span
                    className={`
                      inline-block px-3 py-1 rounded-full text-xs font-semibold
                      ${payment.payment_status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : payment.payment_status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-200 text-gray-800'}
                    `}
                  >
                    {payment.payment_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPayments;
