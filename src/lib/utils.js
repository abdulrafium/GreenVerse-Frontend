/**
 * Utility function to merge class names
 * Filters out falsy values and joins remaining classes
 */
export const cn = (...classes) => classes.filter(Boolean).join(' ');

/**
 * Format currency values
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Format date strings
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
