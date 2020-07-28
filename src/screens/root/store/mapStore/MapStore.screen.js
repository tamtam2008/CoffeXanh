import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Colors from '../../../../constants/Colors';
import Container from '../../../../components/layout/Container';
import FindYourPositionContent from './components/FindYourPosition/FindYourPositionContent';
import MapUtils from '../../../../utils/MapUtils';
import MapHeader from './components/FloatLayout/MapHeader.component';
import Controller from './MapStore.controller';
import Reducer, { initialState } from './MapStore.reducer';
import StoreCarousel from './components/FloatLayout/StoreCarousel.component';
import { useTranslation } from 'react-i18next';
import CustomIcon from '../../../../components/CustomIcon';
import { IconType } from '../../../../constants/Icon';
import { normalize } from '../../../../constants/Layout';

const MapStoreScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [position, setPosition] = useState(null);
  const [isFinding, setFinding] = useState(true);
  const [marginBottom, setMarginBottom] = useState(1);
  const mapRef = useRef();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    isLoading && Controller.getData(dispatch);
    setLoading(false);
  }, [isLoading]);

  const onAfterFinding = useCallback((pos) => {
    if (pos) {
      Controller.findStore(pos, dispatch, () => {
        setFinding(false);
        setPosition(pos);
      });
    } else {
      setFinding(false);
    }
  }, []);

  const onMapLoaded = useCallback(() => {
    if (position) {
      const newPosition = MapUtils.getRegionForCoordinates([
        position,
        ...state.store.map((s) => {
          const gps = s.mapGps
            .trim()
            .split(',')
            .map((_s) => Number.parseFloat(_s));
          return {
            latitude: gps[0],
            longitude: gps[1],
          };
        }),
      ]);
      console.log('newPosition', newPosition);
      mapRef.current?.animateToRegion(newPosition);
    }
  }, [position, state.store]);

  const updateFilter = useCallback(({ provinceId, districtId }) => {
    Controller.getStore({ provinceId, districtId }, dispatch, (store) => {
      if (store && store.length > 0) {
        const newPosition = MapUtils.getRegionForCoordinates(
          store.map((s) => {
            const gps = s.mapGps
              .trim()
              .split(',')
              .map((_s) => Number.parseFloat(_s));
            return {
              latitude: gps[0],
              longitude: gps[1],
            };
          }),
        );
        console.log('newPosition', newPosition);
        mapRef.current?.animateToRegion(newPosition);
      }
    });
  }, []);

  useEffect(() => {
    if (!state.isLoading && !position && !isFinding) {
      updateFilter({
        provinceId: state.filter.province.id,
        districtId: state.filter.district.id,
      });
    }
  }, [
    isFinding,
    position,
    state.filter.district.id,
    state.filter.province.id,
    state.isLoading,
    updateFilter,
  ]);
  return isFinding ? (
    <FindYourPositionContent
      onAfterFinding={onAfterFinding}
      dispatch={dispatch}
    />
  ) : (
    <Container
      isLoading={state.isLoading}
      isRequesting={state.isRequesting}
      isFail={state.isFail}
      failMsg={t(state.failMsg)}
      contentStyle={styles.container}
      scrollEnabled={state.isFail}
      onRefresh={() => {
        Controller.getData(dispatch);
        setFinding(true);
      }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={MapUtils.DEFAULT_LOCATION}
        style={[styles.map, { marginBottom: marginBottom }]}
        mapPadding={{ bottom: 5, top: 62, right: 5 }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        rotateEnabled={false}
        loadingEnabled={true}
        loadingIndicatorColor={Colors.tintColor}
        onMapReady={() => {
          setMarginBottom(0);
          // mapRef.current?.animateToRegion(position);
          onMapLoaded();
        }}>
        {state.store.map((s) => {
          const gps = s.mapGps
            .trim()
            .split(',')
            .map((_s) => Number.parseFloat(_s));
          return (
            <Marker
              coordinate={{
                latitude: gps[0],
                longitude: gps[1],
              }}>
              <CustomIcon
                name={{
                  active: require('../../../../../assets/images/tabIconActive.png'),
                  inactive: require('../../../../../assets/images/tabIconDefault.png'),
                }}
                size={normalize(32)}
                type={IconType.IMAGE}
                focused
              />
            </Marker>
          );
        })}
      </MapView>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        ]}>
        <MapHeader
          filter={state.filter}
          province={state.province}
          district={state.district}
          updateFilter={updateFilter}
        />
        <StoreCarousel
          store={state.store}
          district={state.filter.district}
          style={{ marginBottom: 16 }}
          mapRef={mapRef}
        />
      </View>
    </Container>
  );
};

export default MapStoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
