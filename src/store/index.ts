import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import searchReducer from '../store/reducers/searchReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, searchReducer);

export const store = configureStore({
  reducer: {
    search: persistedReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
});

export const persistor = persistStore(store);
