import { describe, expect, it } from 'vitest';
import { formatUntil, minutesUntilBedtime } from './bedtime';

describe('minutesUntilBedtime', () => {
  it('counts to a later time the same day', () => {
    expect(minutesUntilBedtime('22:30', new Date(2026, 2, 10, 22, 0, 0))).toBe(30);
  });
  it('wraps to tomorrow when the time has passed (past midnight)', () => {
    // 23:50 now, 22:30 bedtime → tomorrow's 22:30 = 22h40m = 1360 min.
    expect(minutesUntilBedtime('22:30', new Date(2026, 2, 10, 23, 50, 0))).toBe(1360);
  });
  it('treats the exact bedtime as the next day (a full day away)', () => {
    expect(minutesUntilBedtime('22:30', new Date(2026, 2, 10, 22, 30, 0))).toBe(1440);
  });
});

describe('formatUntil', () => {
  it('formats hours and minutes', () => {
    expect(formatUntil(30)).toBe('30m');
    expect(formatUntil(95)).toBe('1h 35m');
    expect(formatUntil(120)).toBe('2h 0m');
  });
});
