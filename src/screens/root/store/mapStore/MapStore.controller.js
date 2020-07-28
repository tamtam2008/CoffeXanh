import MapService from '../../../../services/MapService';
import Actions from './MapStore.action';

const Controller = {
  getData: dispatch => {
    dispatch({
      type: Actions.GET_DATA,
    });
    MapService.getProvinceAndDistMap().subscribe(data => {
      const { status } = data.response;
      if (status === 200) {
        dispatch({
          type: Actions.GET_DATA_SUCCESS,
          payload: data.response.dataDist,
        });
      } else {
        let failMsg = 'notify.failMsg';
        if (error.status === 500) {
          failMsg = 'notify.code.500';
        }
        dispatch({ type: Actions.GET_STORE_FAIL, payload: failMsg });
      }
    });
  },
  findStore: (position, dispatch, callback) => {
    MapService.loadStoreByLatLng({
      lat: position.latitude,
      lon: position.longitude,
    }).subscribe(data => {
      const { status } = data.response;
      if (status === 200) {
        dispatch({ type: Actions.GET_STORE_SUCCESS, payload: data.response });
      } else {
        let failMsg = 'notify.failMsg';
        if (status === 500) {
          failMsg = 'notify.code.500';
        }
        dispatch({ type: Actions.GET_STORE_FAIL, payload: failMsg });
      }
      callback();
    });
  },
  getStore: ({ provinceId, districtId }, dispatch, callback) => {
    dispatch({ type: Actions.GET_STORE });
    MapService.getStoreByDistId(districtId).subscribe(res => {
      const { status } = res.response;
      if (status === 200) {
        const { data, pathPhoto } = res.response;
        dispatch({
          type: Actions.GET_STORE_SUCCESS,
          payload: {
            provinceId,
            districtId,
            store: data,
            pathPhoto,
          },
        });
        callback(data);
      } else {
        const failMsg =
          status === 500 || status === 0
            ? `notify.code.${status}`
            : 'notify.failMsg';
        dispatch({ type: Actions.GET_STORE_FAIL, payload: failMsg });
      }
    });
  },
};

export default Controller;
