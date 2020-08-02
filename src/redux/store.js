import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import cartReducer from './reducer/cart.reducer';
import authReducer from './reducer/auth.reducer';

const staticReducers = {
  cart: cartReducer,
  auth: authReducer,
};

const storeEnhancer = applyMiddleware(thunkMiddleware);

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
