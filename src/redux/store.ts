import { combineReducers, configureStore } from '@reduxjs/toolkit';
import moviesSlice from "./slices/movies-slice" 
import mediaSlice from './slices/media-slice';
import tvShowsSlice from './slices/tv-shows-slice';
import authSlice from './slices/auth-slice';

const rootReducer = combineReducers({
    movies: moviesSlice,
    media: mediaSlice,
    tvShows: tvShowsSlice,
    auth: authSlice
  });

const store = configureStore({
    reducer: rootReducer
  });
  
  export default store;
  
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch