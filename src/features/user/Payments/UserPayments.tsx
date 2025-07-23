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

  if (loading) return <p>Loading payments...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Payment History</h2>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Amount</th>
                <th className="py-2 px-4 border">Transaction ID</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.payment_id}>
                  <td className="py-2 px-4 border">{formatDate(payment.created_at)}</td>
                  <td className="py-2 px-4 border">
                    ${Number(payment.amount).toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border">{payment.transaction_id || 'N/A'}</td>
                  <td className="py-2 px-4 border">{payment.payment_status || 'Unknown'}</td>
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
