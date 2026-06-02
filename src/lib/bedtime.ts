/*
 * Pure time-until-bedtime maths. Given a "HH:MM" wind-down time and now, returns
 * the whole minutes until it next occurs — handling the wrap past midnight (a
 * 22:30 bedtime seen at 23:50 is tomorrow's 22:30).
 */
export function minutesUntilBedtime(bedtime: string, now: Date): number {
  const [hours, minutes] = bedtime.split(':').map(Number);
  const target = new Date(now);
  target.setHours(hours, minutes, 0, 0);
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }
  return Math.round((target.getTime() - now.getTime()) / 60000);
}

/** A friendly "1h 5m" / "30m" countdown label. */
export function formatUntil(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${hours > 0 ? `${hours}h ` : ''}${mins}m`;
}
