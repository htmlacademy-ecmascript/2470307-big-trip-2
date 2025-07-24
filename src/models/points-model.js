import { getRandomPoint } from '../mock/points-mock.js';
import { POINT_COUNT_RENDER } from '../constants.js';

export default class PointsModel {
  points = Array.from({ length: POINT_COUNT_RENDER }, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
