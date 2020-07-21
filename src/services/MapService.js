import HttpClient from './utils/HttpClient';

export default {
  getAddressFromLocation: ({ lat, lon }) =>
    HttpClient.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      {},
    ),
  findLocationFromAddress: address =>
    HttpClient.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURI(
        address,
      )}`,
      {},
    ),
};
