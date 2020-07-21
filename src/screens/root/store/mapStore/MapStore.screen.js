import Geolocation from '@react-native-community/geolocation';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import MapService from '../../../../services/MapService';

const ASPECT_RATIO = Layout.window.width / Layout.window.height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapStoreScreen = () => {
  const [position, setPosition] = useState({
    latitude: 10.7978598,
    longitude: 106.685739,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [foundUserLocation, setFoundUserLocation] = useState(false);
  // const [watchID, setWatchID] = useState(null);
  useLayoutEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        console.log('MapStoreScreen', pos);
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
        setFoundUserLocation(true);
        MapService.getAddressFromLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        }).subscribe(data => {
          //data.address.suburb
        });
      },
      async e => {
        // TopNotifyUtils.fail('MapStoreScreen');
        console.log('MapStoreScreen', e);
        // try {
        //   const granted = await PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        //     {
        //       title: 'ReactNativeCode Location Permission',
        //       message: 'ReactNativeCode App needs access to your location ',
        //     },
        //   );
        //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //     Alert.alert('location active');
        //   } else {
        //     Alert.alert('location de active');
        //   }
        // } catch (err) {
        //   console.warn(err);
        // }
        if (e.message === 'No location provider available.') {
          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          })
            .then(data => {
              // The user has accepted to enable the location services
              // data can be :
              //  - "already-enabled" if the location services has been already enabled
              //  - "enabled" if user has clicked on OK button in the popup
              console.log(data);
            })
            .catch(err => {
              console.log(err);
              // The user has not accepted to enable the location services or something went wrong during the process
              // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
              // codes :
              //  - ERR00 : The user has clicked on Cancel button in the popup
              //  - ERR01 : If the Settings change are unavailable
              //  - ERR02 : If the popup has failed to open
            });
        }
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);
  // useEffect(() => {
  //   const wID = Geolocation.watchPosition(
  //     pos => {
  //       console.log('MapStoreScreen', pos);
  //       setPosition({
  //         latitude: pos.coords.latitude,
  //         longitude: pos.coords.longitude,
  //         latitudeDelta: LATITUDE_DELTA,
  //         longitudeDelta: LONGITUDE_DELTA,
  //       });
  //     },
  //     e => {
  //       // TopNotifyUtils.fail('gfgf');
  //       console.log('MapStoreScreen', e);
  //     },
  //   );
  //   setWatchID(wID);
  //   return () => {
  //     watchID != null && Geolocation.clearWatch(watchID);
  //   };
  // }, [watchID]);
  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(position)}</Text> */}
      <MapView
        region={position}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={foundUserLocation}
        showsMyLocationButton={true}
        cacheEnabled={true}
        rotateEnabled={false}
        loadingEnabled={true}
        loadingIndicatorColor={Colors.tintColor}
        // onRegionChange={a => {
        //   console.log(a);
        // }}
      >
        <Marker
          icon={4}
          coordinate={{ latitude: 10.7978598, longitude: 106.685739 }}
        />
      </MapView>
    </View>
  );
};

export default MapStoreScreen;

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
