// Function that returns an html template for a month
// firstDay - eg: Mon = 1, Sunday = 7
// numberOfDays - From 28 to 31
export default function(
  firstDay: number,
  numberOfDays: number,
  currentDay: number
): String {
  let monthStarted = false;
  let daysCount = 1;
  let monthTemplate = "";

  // sunday is 0
  if (firstDay === 0) {
    firstDay = 7;
  }

  while (daysCount <= numberOfDays) {
    for (let i = 0; i < 7; i++) {
      if (i + 1 === firstDay && !monthStarted) monthStarted = true;
      if ((i + 1 !== firstDay && !monthStarted) || daysCount > numberOfDays) {
        // if the month hasn't started yet or the daysCount is bigger than the number of days in the month
        // just add an empty span
        monthTemplate += "<span data-day='null' class='day empty'></span>";
      } else {
        // else, add the day number in the span
        monthTemplate += `<span data-day="${daysCount}" class='day ${
          currentDay === daysCount ? "current" : ""
        }'>${daysCount++}</span>`;
      }
    }
    monthTemplate += `<br/>`;
  }

  return monthTemplate;
}
