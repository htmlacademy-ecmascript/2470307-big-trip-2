function createTripSelectedOfferPointTemplate(offers) {
  if (!offers || offers.length === 0) {
    return '';
  }

  const offersList = offers.map(({ title, price }) => `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>
  `).join('');

  return `
    <ul class="event__selected-offers">
      ${offersList}
    </ul>
  `;
}

export { createTripSelectedOfferPointTemplate };
