import { BasePrice } from '../constants.js';

/**
 * @description Генерирует случайную базовую цену в заданном диапазоне
 * @param {number} min - Минимальная цена
 * @param {number} max - Максимальная цена
 * @returns {number}
 */
const getBasePrice = (min = BasePrice.MIN, max = BasePrice.MAX) => Math.floor(Math.random() * (max - min + 1)) + min;

export { getBasePrice };
