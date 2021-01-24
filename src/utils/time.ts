/**
 * Return the diff in hours.
 * @param from Timestamp in seconds
 * @param to Timestamp in seconds
 */
export function getDiffInHours(from: number, to: number): number {
    return (to - from) / 3600
}

/**
 * Return the diff in minutes.
 * @param from Timestamp in seconds
 * @param to Timestamp in seconds
 */
export function getDiffInMinutes(from: number, to: number): number {
    return Math.round((to - from) / 60)
}

/**
 * Return as a string the time difference in hours or minutes as I don't expect article being too old.
 * @param from Timestamp in seconds
 * @param to Timestamp in seconds
 */
export function getDiffText(from: number, to: number): string {
    const diffInHours = getDiffInHours(from, to)
    if (diffInHours < 1) return `${getDiffInMinutes(from, to)} min`
    return `${Math.round(diffInHours)} hour${Math.round(diffInHours) > 1 ? 's' : ''}`
}
