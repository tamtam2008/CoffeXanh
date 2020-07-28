import Layout from '../constants/Layout';

const ASPECT_RATIO = Layout.window.width / Layout.window.height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_LOCATION = {
  latitude: 10.7978598,
  longitude: 106.685739,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default {
  ASPECT_RATIO,
  DEFAULT_LOCATION,
  getLongitudeDelta: latitudeDelta => latitudeDelta * ASPECT_RATIO,
  getRegionForCoordinates: (points, clearing = 0.005) => {
    // points should be an array of { latitude: X, longitude: Y }
    let minX, maxX, minY, maxY;
    console.log('Points', points);
    minX = points[0].latitude;
    maxX = points[0].latitude;
    minY = points[0].longitude;
    maxY = points[0].longitude;
    // calculate rect
    points.map(point => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = maxX - minX + clearing;
    const deltaY = maxY - minY + clearing;

    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY,
    };
  },
};
