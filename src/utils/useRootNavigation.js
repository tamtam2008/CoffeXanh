import { StackActions } from '@react-navigation/native';
import * as React from 'react';

const isMountedRef = React.createRef();

const navigationRef = React.createRef();

function navigate(name, params) {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  } else {
    console.warn('app not loading');
  }
}

function push(...args) {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.dispatch(StackActions.push(...args));
  } else {
    console.warn('app not loading');
  }
}

export default () => ({
  navigate: navigate,
  push: push,
  navigationRef,
  isMountedRef,
});
