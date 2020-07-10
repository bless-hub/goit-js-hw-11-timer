// eslint-disable-next-line import/extensions
import { getDays, getHours, getMins, getSecs } from './timerUtils.js';

const template = (days, hours, mins, secs) => `
<h1>Until the NEW YEAR left<h1>
<div class="timer" id="timer-1">
  <div class="field">
    <span class="value" data-value="days">${days}</span>
    <span class="label">Days</span>
  </div>

  <div class="field">
    <span class="value" data-value="hours">${hours}</span>
    <span class="label">Hours</span>
  </div>

  <div class="field">
    <span class="value" data-value="mins">${mins}</span>
    <span class="label">Minutes</span>
  </div>

  <div class="field">
    <span class="value" data-value="secs">${secs}</span>
    <span class="label">Seconds</span>
  </div>
</div>
`;

export default function Timer({ selector }) {
  this.days = 0;
  this.hours = 0;
  this.mins = 0;
  this.secs = 0;
  this.id = undefined;

  document
    .querySelector(selector)
    .insertAdjacentHTML(
      'beforeend',
      template(this.days, this.hours, this.mins, this.secs),
    );

  const refs = {
    days: document.querySelector(`${selector} .value[data-value=days]`),
    hours: document.querySelector(`${selector} .value[data-value=hours]`),
    mins: document.querySelector(`${selector} .value[data-value=mins]`),
    secs: document.querySelector(`${selector} .value[data-value=secs]`),
  };

  const timerId = setInterval(() => {
    const start = Date.now();
    const end = new Date('January 1, 2021');
    const diff = end - start;

    const days = getDays(diff)
      .toString()
      .padStart(2, 0);

    const hours = getHours(diff)
      .toString()
      .padStart(2, 0);

    const minutes = getMins(diff)
      .toString()
      .padStart(2, 0);

    const seconds = getSecs(diff)
      .toString()
      .padStart(2, 0);

    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${minutes}`;
    refs.secs.textContent = `${seconds}`;
    if (seconds <= 0 && minutes <= 0 && hours <= 0) {
      alert('Time is over');
      clearInterval(timerId);
    }
  }, 1000);
}
