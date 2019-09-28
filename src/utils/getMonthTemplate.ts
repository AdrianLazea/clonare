// Function that returns an array of day objects that can be read in the render of my-component
// firstDay - eg: Mon = 1, Sunday = 7
// numberOfDays - From 28 to 31
export default function(
  firstDay: number,
  numberOfDays: number,
  currentDay: number
): any {
  let monthStarted = false;
  let daysCount = 1;
  const monthTemplateArray: Array<{ day: any }>[] = [];

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
        const dayObject: any = {};
        dayObject.day = null;
        dayObject.isBreak = false;
        monthTemplateArray.push(dayObject);
      } else {
        // else, add the day number in the span
        const dayObject: any = {};
        dayObject.day = daysCount;
        dayObject.isCurrent = currentDay === daysCount;
        daysCount++;
        monthTemplateArray.push(dayObject);
      }
    }
    const dayObject: any = {};
    dayObject.day = null;
    dayObject.isBreak = true;
    monthTemplateArray.push(dayObject);
  }

  return monthTemplateArray;
}
