import { useEffect, useState } from 'react';
import { fetchPayments, deletePayment } from '@/services/payments';
import type { SanitizedPayment } from '@/types/payments';
import PaymentTable from './PaymentTable';
import PaymentDetailsModal from './PaymentDetailsModal';

const Payments = () => {
  const [payments, setPayments] = useState<SanitizedPayment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<SanitizedPayment | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadPayments = async () => {
    setLoading(true);
    try {
      const data = await fetchPayments();
      setPayments(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this payment?')) return;
    setDeletingId(id);
    try {
      await deletePayment(id);
      setPayments((prev) => prev.filter((p) => p.payment_id !== id));
      setSelectedPayment(null);
    } catch {
      alert('Failed to delete payment');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Payments</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <PaymentTable
          payments={payments}
          onDelete={handleDelete}
          onView={setSelectedPayment}
          deletingId={deletingId}
        />
      )}
      {selectedPayment && (
        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      )}
    </div>
  );
};

export default Payments;
