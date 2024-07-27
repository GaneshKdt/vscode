import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from './reducer'

const persistReducerConfig = {
  key: 'root',
  storage,
}

export default () => {
	const persistedReducer = persistReducer(persistReducerConfig, rootReducer)
	let store = createStore(persistedReducer)
	let persistor = persistStore(store, {key: 'root'})
	return { store, persistor }
}