// utils/formatDate.ts
export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
