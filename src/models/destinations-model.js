import { destinations } from '../mock/destinations-mock.js';

export default class DestinationsModel {
  destinations = destinations;

  getDestinations() {
    return this.destinations;
  }
}
