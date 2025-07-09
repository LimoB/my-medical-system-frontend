// src/utils/paymentUtils.ts

export const formatPaymentMethod = (method: string): string => {
  const methodMap: Record<string, string> = {
    stripe: 'Stripe',
    mpesa: 'M-Pesa',
    paypal: 'PayPal',
    cash: 'Cash',
  };

  return methodMap[method] || method;
};
