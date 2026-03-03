/**
 * Check if a given date string represents a date within the last specified number of days.
 * @param dateString - The ISO date string to check (YYYY-MM-DD).
 * @param days - The number of days to check against (default: 14).
 * @returns True if the date is within the specified days, false otherwise or if invalid.
 */
export const isWithinDays = (dateString?: string, days: number = 14): boolean => {
    if (!dateString) return false;

    const updatedDate = new Date(dateString);
    if (isNaN(updatedDate.getTime())) return false;

    const now = new Date();
    const diffTime = Math.abs(now.getTime() - updatedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays <= days;
};
