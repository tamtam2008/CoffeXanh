import Actions from './MapStore.action';
import AppConfig from '../../../../config/App.config';
import { dynamicSort } from '../../../../utils/AppUtils';

export const initialState = {
  isRequesting: false,
  isLoading: false,
  isFail: false,
  failMsg: '',
  province: [],
  district: [],
  store: [],
  filter: {
    province: {
      name: 'N/a',
    },
    district: {
      name: 'N/a',
    },
  },
};

const Reducer = (state, { type, payload }) => {
  switch (type) {
    case Actions.GET_DATA:
      return {
        ...state,
        isRequesting: false,
        isLoading: true,
        isFail: false,
      };
    case Actions.GET_STORE:
      return {
        ...state,
        isRequesting: true,
        isFail: false,
      };
    case Actions.GET_DATA_SUCCESS: {
      const _province = payload.sort(dynamicSort('id', 'asc'));
      const _district =
        payload.length > 0
          ? _province[0].listDist.sort(dynamicSort('distId', 'asc'))
          : [];
      return {
        ...state,
        isRequesting: false,
        isLoading: false,
        isFail: false,
        province: payload,
        district: _district,
        filter: {
          province: {
            id: payload.length > 0 ? payload[0].id : -1,
            name: payload.length > 0 ? payload[0].name : 'N/a',
          },
          district: {
            id: _district.length > 0 ? _district[0].distId : -1,
            name: _district.length > 0 ? _district[0].distName : 'N/a',
          },
        },
      };
    }
    case Actions.GET_DATA_FAIL:
    case Actions.GET_STORE_FAIL:
      return {
        ...state,
        isRequesting: false,
        isLoading: false,
        isFail: true,
        failMsg: payload,
      };
    case Actions.GET_STORE_SUCCESS: {
      const { provinceId, districtId, store } = payload;
      const _province = state.province.filter(p => p.id === provinceId)[0];
      const _district = _province?.listDist.filter(
        d => d.distId === districtId,
      )[0] || { distId: -1, distName: 'N/a' };
      return {
        ...state,
        isRequesting: false,
        isLoading: false,
        isFail: false,
        district: _province?.listDist || [],
        filter: {
          province: { id: _province?.id, name: _province?.name },
          district: {
            id: _district.distId,
            name: _district.distName,
          },
        },
        store:
          store.map(val => ({
            ...val,
            image: encodeURI(
              `${AppConfig.ServerAddress}${payload.pathPhoto}${val.imagePath}`,
            ),
          })) || state.store,
      };
    }
  }
};
export default Reducer;
