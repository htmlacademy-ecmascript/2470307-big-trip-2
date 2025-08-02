/**
 * @description Возвращает случайный элемент из массива
 * @param {Array} items - Массив
 * @returns {*}
 */
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export { getRandomArrayElement };
