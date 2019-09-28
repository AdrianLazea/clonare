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

  for (let week = 1; week <= 5; week++) {
    for (let i = 1; i <= 7; i++) {
      if (i === firstDay && !monthStarted) monthStarted = true;
      if (i !== firstDay && !monthStarted) {
        // if the month hasn't started yet or the daysCount is bigger than the number of days in the month
        // just add an empty span
        monthTemplate += "<span data-day='null' class='day empty'></span>";
      } else if (daysCount <= numberOfDays) {
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
