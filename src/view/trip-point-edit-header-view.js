import { formatDateTime } from '../utils/datetime.js';

/**
 * @description Создает шаблон для списка типов событий
 * @param {string} currentType - Текущий тип точки
 * @param {Array} allOffers - Все доступные опции
 * @returns {string}
 */
function createEventTypeItemsTemplate(currentType, allOffers) {
  return allOffers.map(({ type }) => {
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
    const isChecked = type === currentType ? 'checked' : '';
    return `
      <div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizedType}</label>
      </div>
    `;
  }).join('');
}

/**
 * @description Создает шаблон для списка пунктов назначения в datalist
 * @param {Array} allDestinations - Все доступные пункты назначения
 * @returns {string}
 */
function createDestinationOptionsTemplate(allDestinations) {
  return allDestinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

/**
 * @description Создает шаблон для шапки формы редактирования
 * @param {Object} point - Точка маршрута
 * @param {Array} allDestinations - Все доступные пункты назначения
 * @param {Array} allOffers - Все доступные опции
 * @param {boolean} isCreating - Флаг, указывающий, создается ли новая точка
 * @returns {string}
 */
function createTripPointEditHeaderTemplate(point, allDestinations, allOffers, isCreating) {
  const { type, destination, dateFrom, dateTo, basePrice } = point;
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  return `
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypeItemsTemplate(type, allOffers)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">${capitalizedType}</label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">${createDestinationOptionsTemplate(allDestinations)}</datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom ? formatDateTime(dateFrom) : ''}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo ? formatDateTime(dateTo) : ''}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1"><span class="visually-hidden">Price</span>&euro;</label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${isCreating ? 'Cancel' : 'Delete'}</button>
      ${isCreating ? '' : '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>'}
    </header>
  `;
}

export { createTripPointEditHeaderTemplate };
