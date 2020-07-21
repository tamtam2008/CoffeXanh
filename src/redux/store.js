import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { exitApp } from './enhancer/app.enhancer';
import { logout } from './enhancer/auth.enhancer';
import authReducer from './reducer/auth.reducer';
import cartReducer from './reducer/cart.reducer';
import notifyReducer from './reducer/notify.reducer';

const staticReducers = {
  auth: authReducer,
  notify: notifyReducer,
  cart: cartReducer,
};

const storeEnhancer = applyMiddleware(thunkMiddleware, logout, exitApp);

//create store
const store = createStore(
  combineReducers(staticReducers),
  __DEV__
    ? composeWithDevTools({
        name: 'Xanh Coffee - User App',
        port: 8000,
        hostname: 'localhost',
        realtime: true,
      })(storeEnhancer)
    : storeEnhancer,
);

export default store;
