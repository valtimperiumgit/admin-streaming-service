import { combineReducers, configureStore } from '@reduxjs/toolkit';
import moviesSlice from "./slices/movies-slice" 

const rootReducer = combineReducers({
    movies: moviesSlice
  });

const store = configureStore({
    reducer: rootReducer
  });
  
  export default store;
  
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch