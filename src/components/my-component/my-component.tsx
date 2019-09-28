import { Component, Prop, h, State } from "@stencil/core";
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

  @State() monthData: any;
  @State() currentDay: number;
  @State() currentMonth: number;
  @State() currentYear: number;
  @State() months: Array<String> = [
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
  @State() monthTemplate: any;
  @State() selectedDate: string;
  @State() isDatePickerVisible: boolean = false;

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

    this.formatSelectedDate();
  }

  // dd / mm / yyyy
  formatSelectedDate() {
    this.selectedDate = `${this.currentDay} / ${
      this.months[this.currentMonth]
    } / ${this.currentYear}`;
  }

  buildMonthTemplate() {
    this.monthData = getMonthData(this.currentYear, this.currentMonth);
    const { firstDay, numberOfDays } = this.monthData;
    this.monthTemplate = getMonthTemplate(
      firstDay,
      numberOfDays,
      this.currentDay
    );
  }

  decrementYear() {
    if (this.currentYear >= 1970) {
      this.currentYear -= 1;
    }
    this.buildMonthTemplate();
  }

  incrementYear() {
    this.currentYear += 1;
    this.buildMonthTemplate();
  }

  decrementMonth() {
    this.currentMonth === 0 ? (this.currentMonth = 11) : this.currentMonth--;
    this.buildMonthTemplate();
  }

  incrementMonth() {
    this.currentMonth === 11 ? (this.currentMonth = 0) : this.currentMonth++;
    this.buildMonthTemplate();
  }

  selectDay(day: number) {
    this.currentDay = day;
    this.formatSelectedDate();
    this.toggleDatePicker();
  }

  toggleDatePicker() {
    this.isDatePickerVisible = !this.isDatePickerVisible;
  }

  render() {
    this.buildMonthTemplate();
    return (
      <div class="date-picker-wrapper">
        <input
          type="text"
          value={this.selectedDate}
          onClick={this.toggleDatePicker.bind(this)}
          readOnly
        />
        <div
          class={
            "date-picker-select " +
            (this.isDatePickerVisible ? "visible" : "hidden")
          }
        >
          <div class="year">
            <button onClick={this.decrementYear.bind(this)}>prev</button>
            Year: <span>{this.currentYear}</span>
            <button onClick={this.incrementYear.bind(this)}>next</button>
          </div>
          <div class="month">
            <button onClick={this.decrementMonth.bind(this)}> prev</button>
            Month: <span>{this.months[this.currentMonth]}</span>
            <button onClick={this.incrementMonth.bind(this)}>next</button>
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
          <div>
            {this.monthTemplate.map(dayObject => {
              if (dayObject.day) {
                const cssClass = dayObject.isCurrent ? "day current" : "day";
                return (
                  <span
                    onClick={() => this.selectDay(dayObject.day)}
                    class={cssClass}
                  >
                    {dayObject.day}
                  </span>
                );
              } else if (dayObject.isBreak) {
                return <br />;
              } else {
                return <span class="day empty"></span>;
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}
