import { addDays, startOfWeek, subDays } from 'date-fns';
import { defaultSprintLength } from './constants';

const daysIntoNextWeekStillClosingLastWeek = 3;

export type SprintWeek = {
  startDate: Date;
  endDate: Date;
}

export function closingWeek(now: Date): SprintWeek {
  const startDate = startOfWeek(subDays(now, daysIntoNextWeekStillClosingLastWeek), {weekStartsOn: 1});
  return {startDate, endDate: addDays(startDate, defaultSprintLength - 1)};
}
