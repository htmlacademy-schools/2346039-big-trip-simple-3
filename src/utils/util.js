import dayjs from 'dayjs';
import { SortType, FilterType, MODEL_DATE_FORMAT } from '../const.js';

export const getRandomInt = (upperBound = 100) => (Math.floor(Math.random() * upperBound));

export const getFormattedDate = (eventDate = dayjs(), format = MODEL_DATE_FORMAT) => dayjs(eventDate).format(format);

export const turnModelDateToFramework = (date) => dayjs(date).format('DD/MM/YY HH:mm');

export const isEventUpcoming = (date) => !dayjs(date).isBefore(dayjs(), 'day');

export const compareDates = (a, b) => dayjs(a).diff(dayjs(b)) < 0;

export const getIdFromTag = (tag) => +tag.id.split('-').slice(-1);

export const validateNumber = (num) => {
  if (isNaN(num)) {
    return 0;
  } else if (num >= 0) {
    return num;
  }
  return -num;
};

export const getAvailableOffers = (type, offers) => {
  for (const category of offers) {
    if (category.type === type) {
      return category.offers;
    }
  }
};

export const generateAuthorizationKey = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const getListElementsNamesList = (availableDestinations) =>
  availableDestinations.map((element) => element.name);

export const getListElementId = (destinationName, availableDestinations) =>
  getListElementsNamesList(availableDestinations)
    .indexOf(destinationName) + 1;

export const getMockText = (len) => {
  const mockText = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
  est laborum.`;
  return mockText.slice(0, len);
};

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isEventUpcoming(point.date_from)),
};

export const sort = {
  [SortType.DAY]: (points) => points,
  [SortType.EVENT]: (points) => points,
  [SortType.TIME]: (points) => points,
  [SortType.PRICE]: (points) => points,
  [SortType.OFFERS]: (points) => points,
};

export const sortPointsByDay = (pa, pb) => dayjs(pa.date_from).toDate() - dayjs(pb.date_from).toDate();

export const sortPointsByPrice = (pa, pb) => pb.base_price - pa.base_price;

export const defaultPoint = () => Object.assign({}, {
  'id': 0,
  'type': 'taxi',
  'base_price': 0,
  'date_from': getFormattedDate(),
  'date_to': getFormattedDate(),
  'destination': 1,
  'offers': [],
});

