import { getRandomArrayElement } from '../utils/random.js';
import { getBasePrice } from '../utils/base-price.js';

/**
 * @description Массив "сырых" данных о точках маршрута
 */
const points = [
  {
    'id': 'ddbdfdd5-2771-4207-9bdd-b77962f4f784',
    'base_price': getBasePrice(),
    'date_from': '2025-07-11T03:58:14.333Z',
    'date_to': '2025-07-11T18:33:14.333Z',
    'destination': 'd138cd74-d5cc-4089-bbe9-5249d5d9094c',
    'is_favorite': false,
    'offers': [
      '05b5cc12-dd47-4780-9497-697de420e45a'
    ],
    'type': 'restaurant'
  },
  {
    'id': '67cf1f3d-14fd-46c4-8ed6-9128b901b5be',
    'base_price': getBasePrice(),
    'date_from': '2025-07-13T12:54:14.333Z',
    'date_to': '2025-07-14T20:12:14.333Z',
    'destination': 'fe4d0499-5aa0-4fc9-9c32-cf7b4ed91b50',
    'is_favorite': true,
    'offers': [
      '820d0ff9-9c48-48b0-9594-9b71dd9214f3',
      '52422065-d51c-48ab-9124-252b804d656f'
    ],
    'type': 'taxi'
  },
  {
    'id': '5946a6e9-aab6-44da-8e8b-733f00d95083',
    'base_price': getBasePrice(),
    'date_from': '2025-07-15T08:55:14.333Z',
    'date_to': '2025-07-16T15:33:14.333Z',
    'destination': '078e2cc6-c6e2-4e37-bfaf-37ba2687c1d9',
    'is_favorite': false,
    'offers': [
      'ff891345-7bb6-4e19-9033-51198e4b23c0',
      '05b5cc12-dd47-4780-9497-697de420e45a'
    ],
    'type': 'restaurant'
  },
  {
    'id': '08775234-f9c3-4372-b741-d4db711e04fa',
    'base_price': getBasePrice(),
    'date_from': '2025-07-17T03:47:14.333Z',
    'date_to': '2025-07-18T22:31:14.333Z',
    'destination': '1d745726-5c20-4acd-996e-3e8a6270b7fb',
    'is_favorite': true,
    'offers': [],
    'type': 'drive'
  },
  {
    'id': '3379fae9-9392-4c46-b885-c75f76ab29de',
    'base_price': getBasePrice(),
    'date_from': '2025-07-19T07:12:14.333Z',
    'date_to': '2025-07-19T20:28:14.333Z',
    'destination': 'd138cd74-d5cc-4089-bbe9-5249d5d9094c',
    'is_favorite': false,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': 'b761f2ec-9e5f-4af7-8988-69cf7fb98322',
    'base_price': getBasePrice(),
    'date_from': '2025-07-20T21:46:14.333Z',
    'date_to': '2025-07-21T23:17:14.333Z',
    'destination': 'd138cd74-d5cc-4089-bbe9-5249d5d9094c',
    'is_favorite': true,
    'offers': [
      '68de9d35-cc64-43e2-a367-754b605a53ca',
      '820d0ff9-9c48-48b0-9594-9b71dd9214f3',
      '52422065-d51c-48ab-9124-252b804d656f'
    ],
    'type': 'taxi'
  },
  {
    'id': '05349c34-520b-43ae-9e1e-0635ebd8c9aa',
    'base_price': getBasePrice(),
    'date_from': '2025-07-23T02:19:14.333Z',
    'date_to': '2025-07-23T08:56:14.333Z',
    'destination': 'dd360e18-5b41-4f28-beb2-9ea85371ac66',
    'is_favorite': true,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': 'b2395c25-4178-4886-b910-42e31df0c715',
    'base_price': getBasePrice(),
    'date_from': '2025-07-24T20:58:14.333Z',
    'date_to': '2025-07-26T02:10:14.333Z',
    'destination': 'd138cd74-d5cc-4089-bbe9-5249d5d9094c',
    'is_favorite': false,
    'offers': [
      '37752700-5a23-4343-bb41-e32e026203df',
      'bb8da064-0a98-4ed1-ad91-9d008c58ffda',
      'fef83bd2-e3d7-4ad4-9b11-7a20d0f892f6',
      'ea77ccdb-e0b7-448e-9ce2-5d3affc81481',
      '0f73afc4-d506-4948-b917-f7610d778dc8'
    ],
    'type': 'check-in'
  },
  {
    'id': 'cddffbe7-dab1-4dc7-bb08-504c9fd51698',
    'base_price': getBasePrice(),
    'date_from': '2025-07-26T10:24:14.333Z',
    'date_to': '2025-07-28T04:10:14.333Z',
    'destination': '6dce9701-a86b-4d61-807a-90221b12470a',
    'is_favorite': false,
    'offers': [
      '29179c4b-f864-4531-a586-bf662b2c8230',
      '570506c2-b265-4092-9b38-e77933473c2f'
    ],
    'type': 'drive'
  },
  {
    'id': '6cbf190c-2d9e-42a6-bb10-2b2b3335a856',
    'base_price': getBasePrice(),
    'date_from': '2025-07-28T14:44:14.333Z',
    'date_to': '2025-07-29T09:12:14.333Z',
    'destination': 'dd360e18-5b41-4f28-beb2-9ea85371ac66',
    'is_favorite': false,
    'offers': [
      'ea77ccdb-e0b7-448e-9ce2-5d3affc81481',
      '0f73afc4-d506-4948-b917-f7610d778dc8'
    ],
    'type': 'check-in'
  },
  {
    'id': 'f403c108-589f-48ef-987e-06004780ef68',
    'base_price': getBasePrice(),
    'date_from': '2025-07-30T23:10:14.333Z',
    'date_to': '2025-08-01T09:38:14.333Z',
    'destination': '464359fc-8acf-47eb-8434-bbcdad945d8e',
    'is_favorite': true,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': 'f5de276e-d440-48b0-b901-46abf1b2bf56',
    'base_price': getBasePrice(),
    'date_from': '2025-08-03T09:02:14.333Z',
    'date_to': '2025-08-05T03:19:14.333Z',
    'destination': '1d745726-5c20-4acd-996e-3e8a6270b7fb',
    'is_favorite': true,
    'offers': [
      '570506c2-b265-4092-9b38-e77933473c2f'
    ],
    'type': 'drive'
  },
  {
    'id': '015036c2-cb6e-47ad-b7c9-4b6770038581',
    'base_price': getBasePrice(),
    'date_from': '2025-08-06T10:50:14.333Z',
    'date_to': '2025-08-07T14:37:14.333Z',
    'destination': 'dd1aabd6-70d1-4c56-96ce-3dc3f7b61099',
    'is_favorite': true,
    'offers': [
      '6e377be8-c9df-41e4-993e-ece9158138ad',
      'd22180bb-2382-4fd0-b1fc-803514eea318',
      '87a9890a-ddea-44a0-a3c8-1567644527be'
    ],
    'type': 'train'
  },
  {
    'id': '76bdc2bc-1721-4bcb-9332-4e5b3eef8c0b',
    'base_price': getBasePrice(),
    'date_from': '2025-08-08T14:38:14.333Z',
    'date_to': '2025-08-10T04:49:14.333Z',
    'destination': 'd138cd74-d5cc-4089-bbe9-5249d5d9094c',
    'is_favorite': true,
    'offers': [],
    'type': 'bus'
  },
  {
    'id': 'e63cd1c6-9f0c-4ccf-a80a-3ad4aa85823d',
    'base_price': getBasePrice(),
    'date_from': '2025-08-10T19:46:14.333Z',
    'date_to': '2025-08-11T22:01:14.333Z',
    'destination': 'fe4d0499-5aa0-4fc9-9c32-cf7b4ed91b50',
    'is_favorite': true,
    'offers': [],
    'type': 'flight'
  },
  {
    'id': '29134b9e-fdc8-4b2b-85ce-9540592dfa37',
    'base_price': getBasePrice(),
    'date_from': '2025-08-12T11:14:14.333Z',
    'date_to': '2025-08-13T13:29:14.333Z',
    'destination': 'fe4d0499-5aa0-4fc9-9c32-cf7b4ed91b50',
    'is_favorite': true,
    'offers': [
      '548e4cc2-6304-4694-8108-961af7151fee',
      '28e1e2cb-9663-41d4-aa0c-3e682d7d24b4',
      '312df0e6-9276-4b81-a63c-987bf93d704f',
      '81caefda-c56f-4772-8ac5-6ae8d9f75726',
      'b2c0e69c-4616-483b-98d6-412a7a5135e1',
      'c52a2428-f96c-40a7-a401-ead3b2e952d1'
    ],
    'type': 'ship'
  },
  {
    'id': '19eaae76-ccd2-4c47-bb6f-127ac646980f',
    'base_price': getBasePrice(),
    'date_from': '2025-08-14T03:02:14.333Z',
    'date_to': '2025-08-15T14:31:14.333Z',
    'destination': 'dd1aabd6-70d1-4c56-96ce-3dc3f7b61099',
    'is_favorite': true,
    'offers': [
      '570506c2-b265-4092-9b38-e77933473c2f'
    ],
    'type': 'drive'
  },
  {
    'id': 'f687e9ee-0fcc-406b-b79a-9e820eed837f',
    'base_price': getBasePrice(),
    'date_from': '2025-08-16T10:39:14.333Z',
    'date_to': '2025-08-18T00:18:14.333Z',
    'destination': '32308e52-5971-4867-95d0-0899e852df9e',
    'is_favorite': false,
    'offers': [],
    'type': 'train'
  },
  {
    'id': 'e663658b-22a9-424f-ab50-daca63115bc6',
    'base_price': getBasePrice(),
    'date_from': '2025-08-20T00:05:14.333Z',
    'date_to': '2025-08-21T10:40:14.333Z',
    'destination': '32308e52-5971-4867-95d0-0899e852df9e',
    'is_favorite': false,
    'offers': [
      '29179c4b-f864-4531-a586-bf662b2c8230',
      '570506c2-b265-4092-9b38-e77933473c2f'
    ],
    'type': 'drive'
  },
  {
    'id': '072baaf1-3fb0-4acc-9dec-4cc9e2730038',
    'base_price': getBasePrice(),
    'date_from': '2025-08-22T07:13:14.333Z',
    'date_to': '2025-08-22T21:24:14.333Z',
    'destination': '464359fc-8acf-47eb-8434-bbcdad945d8e',
    'is_favorite': false,
    'offers': [
      '6e377be8-c9df-41e4-993e-ece9158138ad',
      'd22180bb-2382-4fd0-b1fc-803514eea318',
      '87a9890a-ddea-44a0-a3c8-1567644527be'
    ],
    'type': 'train'
  },
  {
    'id': '1485a0f1-06be-41b0-b72f-d6aab6cf12c5',
    'base_price': getBasePrice(),
    'date_from': '2025-08-24T05:19:14.333Z',
    'date_to': '2025-08-24T23:35:14.333Z',
    'destination': 'd138cd74-d5cc-4089-bbe9-5249d5d9094c',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '43f09545-d795-4791-b5f1-72c3e279ee10',
    'base_price': getBasePrice(),
    'date_from': '2025-08-25T14:59:14.333Z',
    'date_to': '2025-08-25T22:12:14.333Z',
    'destination': 'dd360e18-5b41-4f28-beb2-9ea85371ac66',
    'is_favorite': true,
    'offers': [
      'dd7ba022-5b4b-441d-b959-f0490c24fa03',
      '957ea999-6258-4cb6-a4a8-bc95136c51e3'
    ],
    'type': 'flight'
  },
  {
    'id': '5aecfd4c-7e27-41c9-9eb0-85f41f321cf1',
    'base_price': getBasePrice(),
    'date_from': '2025-08-26T09:40:14.333Z',
    'date_to': '2025-08-28T06:34:14.333Z',
    'destination': 'd138cd74-d5cc-4089-bbe9-5249d5d9094c',
    'is_favorite': false,
    'offers': [
      '957ea999-6258-4cb6-a4a8-bc95136c51e3'
    ],
    'type': 'flight'
  },
  {
    'id': 'd52c10f1-bf7b-46b6-aa5e-a0101c46030f',
    'base_price': getBasePrice(),
    'date_from': '2025-08-29T08:55:14.333Z',
    'date_to': '2025-08-29T15:49:14.333Z',
    'destination': '078e2cc6-c6e2-4e37-bfaf-37ba2687c1d9',
    'is_favorite': false,
    'offers': [
      '6e377be8-c9df-41e4-993e-ece9158138ad',
      'd22180bb-2382-4fd0-b1fc-803514eea318',
      '87a9890a-ddea-44a0-a3c8-1567644527be'
    ],
    'type': 'train'
  },
  {
    'id': 'f787cc37-9322-44f5-8d75-f06ec4a154e6',
    'base_price': getBasePrice(),
    'date_from': '2025-08-30T20:34:14.333Z',
    'date_to': '2025-08-31T11:59:14.333Z',
    'destination': '1d745726-5c20-4acd-996e-3e8a6270b7fb',
    'is_favorite': false,
    'offers': [],
    'type': 'drive'
  }
];

/**
 * @description Генерирует случайную точку маршрута
 * @returns {Object} Случайная точка маршрута
 */
function getRandomPoint() {
  return getRandomArrayElement(points);
}


export { getRandomPoint };
