import { Component, Prop, h } from "@stencil/core";
import { getMonthData, getMonthTemplate } from "../../utils";

@Component({
  tag: "my-component",
  styleUrl: "my-component.css",
  shadow: true
})
export class MyComponent {
  // year you can pass to the component
  @Prop() year: number;

  // month you can pass to the component
  @Prop() month: number;

  // day you can pass to the component
  @Prop() day: number;

  private monthData: any;
  private currentDay: number;
  private currentMonth: number;
  private currentYear: number;
  private months: Array<String> = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  componentWillLoad() {
    const date = new Date();
    // if a day is passed, show that day selected, else, show the current day
    this.day
      ? (this.currentDay = this.day)
      : (this.currentDay = date.getDate());

    this.month
      ? (this.currentMonth = this.month)
      : (this.currentMonth = date.getMonth());

    this.year
      ? (this.currentYear = this.year)
      : (this.currentYear = date.getFullYear());

    this.monthData = getMonthData(this.currentYear, this.currentMonth);
  }

  render() {
    const { firstDay, numberOfDays } = this.monthData;
    const monthTemplate = getMonthTemplate(
      firstDay,
      numberOfDays,
      this.currentDay
    );

    return (
      <div class="date-picker-wrapper">
        <input type="text" value="" readOnly />
        <div class="date-picker-select">
          <div class="year">
            <button> prev</button>
            Year: <span>{this.currentYear}</span>
            <button>next</button>
          </div>
          <div class="month">
            <button> prev</button>
            Month: <span>{this.months[this.currentMonth]}</span>
            <button>next</button>
          </div>
          <div class="week-days">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>
          <div innerHTML={monthTemplate}></div>
        </div>
      </div>
    );
  }
}
