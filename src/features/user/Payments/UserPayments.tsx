import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { fetchPaymentsByUserId } from '@/services/payments';
import type { SanitizedPayment } from '@/types/payments';
import { formatDate } from '@/utils/formatDate';

const UserPayments = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [payments, setPayments] = useState<SanitizedPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchPaymentsByUserId(userId);
        console.log('📦 Payments:', data);
        setPayments(data);
      } catch (err: any) {
        setError('Failed to load payments');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p className="p-4 text-gray-600">Loading payments...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 sm:p-6 w-full h-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Your Payment History
      </h2>

      {payments.length === 0 ? (
        <p className="text-gray-600">No payments found.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-[800px] text-sm border border-gray-300">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-2 px-4 border-b border-gray-300">Date</th>
                <th className="py-2 px-4 border-b border-gray-300">Amount</th>
                <th className="py-2 px-4 border-b border-gray-300">Transaction ID</th>
                <th className="py-2 px-4 border-b border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {payments.map((payment) => (
                <tr key={payment.payment_id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    {formatDate(payment.created_at)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    ${Number(payment.amount).toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {payment.transaction_id || 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {payment.payment_status || 'Unknown'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserPayments;
