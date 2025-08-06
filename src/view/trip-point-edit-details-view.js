/**
 * @description Создает шаблон для блока с доступными опциями
 * @param {Object} point - Точка маршрута
 * @param {Array} allOffersForType - Все опции для данного типа точки
 * @returns {string}
 */
function createAvailableOffersTemplate(point, allOffersForType) {
  if (!allOffersForType || allOffersForType.length === 0) {
    return '';
  }

  const pointOfferIds = point.offers.map((offer) => offer.id);

  const offersList = allOffersForType.map(({ id, title, price }) => {
    // Проверяем, выбрана ли эта опция у текущей точки
    const isChecked = pointOfferIds.includes(id) ? 'checked' : '';
    const offerId = id.slice(0, 8);
    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerId}-1" type="checkbox" name="event-offer-${offerId}" ${isChecked}>
        <label class="event__offer-label" for="event-offer-${offerId}-1">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>
    `;
  }).join('');

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersList}
      </div>
    </section>
  `;
}

/**
 * @description Создает шаблон для блока с фотографиями пункта назначения
 * @param {Array} pictures - Массив с фотографиями
 * @returns {string}
 */
function createDestinationPicturesTemplate(pictures) {
  if (!pictures || pictures.length === 0) {
    return '';
  }
  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map(({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
      </div>
    </div>
  `;
}

/**
 * @description Создает шаблон для блока с описанием пункта назначения
 * @param {Object} destination - Пункт назначения
 * @returns {string}
 */
function createDestinationDetailsTemplate(destination) {
  if (!destination || (!destination.description && (!destination.pictures || destination.pictures.length === 0))) {
    return '';
  }

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description || ''}</p>
      ${createDestinationPicturesTemplate(destination.pictures)}
    </section>
  `;
}

/**
 * @description Создает шаблон для секции "details" в форме редактирования
 * @param {Object} point - Точка маршрута
 * @param {Array} allOffersForType - Все опции для данного типа точки
 * @returns {string}
 */
function createTripPointEditDetailsTemplate(point, allOffersForType) {
  return `
    <section class="event__details">
      ${createAvailableOffersTemplate(point, allOffersForType)}
      ${createDestinationDetailsTemplate(point.destination)}
    </section>
  `;
}

export { createTripPointEditDetailsTemplate };
