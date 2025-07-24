import { BasePrice } from '../constants.js';

const getBasePrice = (min = BasePrice.MIN, max = BasePrice.MAX) => Math.floor(Math.random() * (max - min + 1)) + min;

export { getBasePrice };
