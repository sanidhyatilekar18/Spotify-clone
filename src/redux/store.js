import { configureStore } from '@reduxjs/toolkit';
import { shazamCoreApi } from './services/shazamCore';
import playerReducer from './features/playerSlice';

const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(shazamCoreApi.middleware),
});

export default store;
