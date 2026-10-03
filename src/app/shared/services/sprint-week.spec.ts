import { closingWeek } from './sprint-week';

describe('closingWeek', () => {
  const lastWeek = {startDate: new Date(2026, 8, 28), endDate: new Date(2026, 9, 4)};
  const thisWeek = {startDate: new Date(2026, 9, 5), endDate: new Date(2026, 9, 11)};

  it('should pick the week that is ending when closed on the weekend', () => {
    expect(closingWeek(new Date(2026, 9, 3, 22, 30))).toEqual(lastWeek);
    expect(closingWeek(new Date(2026, 9, 4, 23, 59))).toEqual(lastWeek);
  });

  it('should pick the past week when closed early in the new week', () => {
    expect(closingWeek(new Date(2026, 9, 5, 0, 1))).toEqual(lastWeek);
    expect(closingWeek(new Date(2026, 9, 7, 18, 0))).toEqual(lastWeek);
  });

  it('should pick the running week when closed from Thursday on', () => {
    expect(closingWeek(new Date(2026, 9, 8, 9, 0))).toEqual(thisWeek);
  });
});
