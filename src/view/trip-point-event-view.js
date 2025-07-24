import { formatTime, getTimeDifference } from '../utils/datetime.js';

function createTripPointEventTemplate(point) {
  const { type, destination, dateFrom, dateTo, basePrice } = point;
  const pointType = type.charAt(0).toUpperCase() + type.slice(1);
  return `
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${pointType} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateFrom}">${formatTime(dateFrom)}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateTo}">${formatTime(dateTo)}</time>
      </p>
      <p class="event__duration">${getTimeDifference(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
  `;
}

export { createTripPointEventTemplate };
