/**
 * Timezone utilities for IST (Asia/Kolkata) date handling
 */

/**
 * Convert any date to IST timezone
 * @param {string|Date} dateString - Date to convert
 * @returns {Date} Date in IST timezone
 */
function convertToIST(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    
    // Convert to IST (UTC+5:30)
    const utcTime = date.getTime();
    const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    return new Date(utcTime + istOffset);
  } catch (error) {
    console.error(`Error converting date to IST: ${dateString}`, error);
    return new Date(); // Return current date as fallback
  }
}

/**
 * Format date as YYYY-MM-DD in IST
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatISTDate(date) {
  try {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Get current IST datetime
 * @returns {Date} Current date in IST
 */
function getISTNow() {
  return convertToIST(new Date());
}

/**
 * Check if date is within N days from now (IST)
 * @param {string|Date} dateString - Date to check
 * @param {number} days - Number of days
 * @returns {boolean} True if within N days
 */
function isWithinDays(dateString, days) {
  try {
    const date = convertToIST(dateString);
    const now = getISTNow();
    const diffTime = now - date;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= days;
  } catch (error) {
    console.error('Error checking date range:', error);
    return false;
  }
}

/**
 * Check if date is in current month (IST)
 * @param {string|Date} dateString - Date to check
 * @returns {boolean} True if in current month
 */
function isThisMonth(dateString) {
  try {
    const date = convertToIST(dateString);
    const now = getISTNow();
    return date.getUTCFullYear() === now.getUTCFullYear() &&
           date.getUTCMonth() === now.getUTCMonth();
  } catch (error) {
    console.error('Error checking month:', error);
    return false;
  }
}

/**
 * Check if date is older than current month (IST)
 * @param {string|Date} dateString - Date to check
 * @returns {boolean} True if older than current month
 */
function isOlderThanMonth(dateString) {
  try {
    const date = convertToIST(dateString);
    const now = getISTNow();
    
    if (date.getUTCFullYear() < now.getUTCFullYear()) {
      return true;
    }
    
    if (date.getUTCFullYear() === now.getUTCFullYear() &&
        date.getUTCMonth() < now.getUTCMonth()) {
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking if older:', error);
    return false;
  }
}

module.exports = {
  convertToIST,
  formatISTDate,
  getISTNow,
  isWithinDays,
  isThisMonth,
  isOlderThanMonth
};
