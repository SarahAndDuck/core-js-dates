/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  return Date.parse(date);
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  let temp = (hour < 10 ? '0' : '') + hour;
  temp += (minute < 10 ? ':0' : ':') + minute;
  temp += (second < 10 ? ':0' : ':') + second;
  return temp;
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const myDay = new Date(date);
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return daysOfWeek[myDay.getUTCDay()];
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  let result = date;
  if (date.getUTCDay() > 5) {
    result = new Date(
      Date.parse(date) + date.getUTCDay() * 24 * 60 * 60 * 1000
    );
  } else if (date.getUTCDay() === 5) {
    result = new Date(Date.parse(date) + 7 * 24 * 60 * 60 * 1000);
  } else if (date.getUTCDay() <= 5) {
    result = new Date(
      Date.parse(date) + (5 - date.getUTCDay()) * 24 * 60 * 60 * 1000
    );
  }
  return result;
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  const daysInMonths1 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const daysInMonths2 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let result = 0;
  if (new Date(year, 1, 29).getDate() === 29) {
    result = daysInMonths2[month - 1];
  } else {
    result = daysInMonths1[month - 1];
  }
  return result;
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  return (
    (Date.parse(dateEnd) - Date.parse(dateStart)) / (60 * 60 * 24 * 1000) + 1
  );
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  const start = Date.parse(period.start);
  const end = Date.parse(period.end);
  const myDate = Date.parse(date);

  if (myDate >= start && myDate <= end) {
    return true;
  }
  return false;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const myDate = new Date(date);
  const dayOfDate = `${myDate.getUTCMonth() + 1}/${myDate.getUTCDate()}/${myDate.getUTCFullYear()}`;
  const hour = myDate.getUTCHours();
  const minute = myDate.getMinutes();
  const second = myDate.getSeconds();
  let temp = `${hour > 12 ? hour - 12 : hour}`;
  if (hour === 0) temp = '12';
  temp += (minute < 10 ? ':0' : ':') + minute;
  temp += (second < 10 ? ':0' : ':') + second;
  temp += hour >= 12 ? ' PM' : ' AM';
  return `${dayOfDate}, ${temp}`;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  const daysInMonths =
    new Date(year, 1, 29).getDate() === 29
      ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let totalNumberOfWeekend = 0;

  for (let i = 1; i <= daysInMonths[month - 1]; i += 1) {
    const date = new Date(Date.UTC(year, month - 1, i));
    if (date.getUTCDay() === 0 || date.getUTCDay() === 6) {
      totalNumberOfWeekend += 1;
    }
  }
  return totalNumberOfWeekend;
}

/**
 * Returns the week number of the year for a given date.
 * The first week of the year is defined according to ISO8601.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const myDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const currentYear = myDate.getFullYear();
  const firstDayOfYear = new Date(Date.UTC(currentYear, 0, 1));
  let dayOfFirstThursdayOfYear = null;
  if (firstDayOfYear.getUTCDay() <= 4)
    dayOfFirstThursdayOfYear = new Date(
      Date.UTC(currentYear, 0, 1 + (4 - firstDayOfYear.getUTCDay()))
    );
  else
    dayOfFirstThursdayOfYear = new Date(
      Date.UTC(currentYear, 0, 1 + (7 - firstDayOfYear.getUTCDay() + 4))
    );
  const firstMondayOfYear = new Date(dayOfFirstThursdayOfYear);
  firstMondayOfYear.setUTCDate(dayOfFirstThursdayOfYear.getUTCDay() - 3);
  const diff = myDate - firstMondayOfYear;
  const milesecInOneWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.floor(diff / milesecInOneWeek) + 1;
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  function findNextFriday(currentDate) {
    if (currentDate.getUTCDay() === 5 && currentDate.getUTCDate() === 13) {
      return currentDate;
    }
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    return findNextFriday(currentDate);
  }
  const result = findNextFriday(date);
  return new Date(result.setDate(13));
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  const myDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const year = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
  ];
  const month = myDate.getUTCMonth() + 1;

  let quarter = 0;
  for (let i = 0; i < year.length; i += 1) {
    if (year[i].filter((item) => item === month).length) quarter = i + 1;
  }
  return quarter;
}
/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const [start, end] = [period.start.split('-'), period.end.split('-')];
  const dataStart = new Date(start[2], start[1] - 1, +start[0]);
  const dataEnd = new Date(end[2], end[1] - 1, +end[0] + 1);
  const schedule = [];
  dataStart.setUTCDate(dataStart.getUTCDate() - 1);
  while (dataStart < dataEnd) {
    for (let i = 0; i < countWorkDays; i += 1) {
      dataStart.setUTCDate(dataStart.getUTCDate() + 1);
      const month =
        dataStart.getMonth() + 1 < 10
          ? `0${dataStart.getMonth() + 1}`
          : dataStart.getMonth() + 1;
      const date =
        dataStart.getDate() < 10
          ? `0${dataStart.getDate()}`
          : dataStart.getDate();
      if (dataStart < dataEnd) {
        schedule.push(`${date}-${month}-${dataStart.getFullYear()}`);
      }
    }
    dataStart.setUTCDate(dataStart.getUTCDate() + countOffDays);
  }
  return schedule;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  date.setUTCMonth(2);
  return date.getUTCDate() === 29;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
