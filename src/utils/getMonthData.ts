// Function that returns an object with the first and the number of days of a month
// year - eg: 2019
// month - Jan = 0, Dec = 11;
export default function(year: number, month: number): Object {
  const firstDay = new Date(year, month, 1);
  const numberOfDays = new Date(year, month + 1, 0);
  return { firstDay, numberOfDays };
}
