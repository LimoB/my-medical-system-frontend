import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { jsPDF } from 'jspdf';
import { FileText, Filter, SortAsc, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
    const csvContent = [headers, ...rows].map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
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
      doc.text(
        [
          formatDate(p.created_at),
          `$${Number(p.amount).toFixed(2)}`,
          p.transaction_id || 'N/A',
          p.payment_status,
        ].join(' | '),
        14,
        y
      );
    });
    doc.save('payments.pdf');
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10 text-teal-600">
        <Loader2 className="animate-spin h-6 w-6" />
        <span className="ml-2 text-sm font-medium">Loading payments...</span>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-600 text-center font-medium">{error}</div>;
  }

  return (
    <motion.div
      className="w-full px-4 py-6 sm:px-6 md:px-8 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-8 flex items-center gap-2">
        <FileText className="w-7 h-7 text-indigo-600" />
        Payment History
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex gap-3 items-center text-sm">
          <div className="flex items-center gap-2">
            <SortAsc className="w-4 h-4 text-gray-500" />
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as any)}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm"
            >
              <option value="created_at">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="payment_status">Sort by Status</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm"
            >
              <option value="All">All</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={exportCSV}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:from-emerald-600 hover:to-teal-700 transition shadow-lg"
          >
            Export CSV
          </button>
          <button
            onClick={exportPDF}
            className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:from-indigo-600 hover:to-blue-700 transition shadow-lg"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {filteredPayments.map((payment) => (
          <motion.div
            key={payment.payment_id}
            className="bg-white border rounded-xl p-5 shadow-md hover:shadow-lg transition-transform"
            whileHover={{ scale: 1.01 }}
          >
            <div className="text-sm text-gray-600">Date: {formatDate(payment.created_at)}</div>
            <div className="text-base font-semibold text-green-700">
              Amount: ${Number(payment.amount).toFixed(2)}
            </div>
            <div className="text-xs font-mono mt-1 text-gray-500 break-words">
              TXN: {payment.transaction_id || 'N/A'}
            </div>
            <div className="mt-3">
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                  payment.payment_status === 'Paid'
                    ? 'bg-green-100 text-green-800'
                    : payment.payment_status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {payment.payment_status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-[700px] w-full bg-white border border-gray-200 rounded-xl shadow-lg text-sm overflow-hidden">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wide">
            <tr>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Transaction ID</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => (
              <tr
                key={payment.payment_id}
                className={`transition hover:bg-gray-50 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="py-3 px-4">{formatDate(payment.created_at)}</td>
                <td className="py-3 px-4 text-green-700 font-semibold">
                  ${Number(payment.amount).toFixed(2)}
                </td>
                <td className="py-3 px-4 font-mono text-xs text-gray-600 break-all max-w-[220px]">
                  {payment.transaction_id || 'N/A'}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      payment.payment_status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : payment.payment_status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {payment.payment_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserPayments;
