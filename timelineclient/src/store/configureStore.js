

import { createStore,applyMiddleware } from 'redux';
import { createMigrate,persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import reducer from './reducer'// the value from combineReducers
import logger from 'redux-logger' 

  const thunk = require('redux-thunk').default;

  const persistConfig = {
    key: 'primary',
    version: 1,
    storage: storage,
    migrate: createMigrate(
      migrations, 
      { 
        debug: false 
      }
    ),
    stateReconciler:autoMergeLevel1
  };

  const migrations = {
    0: (state) => {
      // migration clear out device state
      return {
        ...state,
        device: undefined   
      }
    },
    1: (state) => {
      // migration to keep only device state
      return {
        device: state.device
      }
    }
  }

  const pReducer = persistReducer(persistConfig, reducer);

  export default () => {
    let store = createStore(pReducer,applyMiddleware(logger,thunk));
    let persistor = persistStore(store);
    return { store, persistor }
  }