import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import IMovie from "../../entities/movie";
import { createMovie, getMovies } from "../../api/services/movie-service";
import { RootState } from "../store";

interface IState
{
  movies: IMovie[],
  currentMovie: IMovie,
  isLoading: boolean
}

const initialState : IState = {
  movies: [],
  currentMovie: {} as any,
  isLoading: false
};

export const onCreateMovie = createAsyncThunk("moviesSlice/createMovie", async (data : FormData) => createMovie(data));
export const onGetMovies = createAsyncThunk("moviesSlice/movies", async () => getMovies());

const moviesSlice = createSlice({name: 'moviesSlice', initialState, reducers: {

  setCurrentMovie: (state, action) => {
    state.currentMovie = action.payload;
  },
},

  extraReducers: builder => {
    builder
    .addCase(onCreateMovie.pending, (state) => {
      state.isLoading = true;
    })
    builder
    .addCase(onCreateMovie.fulfilled, (state, {payload}) => {
      state.isLoading = false;
    })
    .addCase(onCreateMovie.rejected, (state) => {
      state.isLoading = false;
    })
    builder
      .addCase(onGetMovies.fulfilled, (state, {payload}) => {
        state.movies = payload;
      })
      .addDefaultCase(() => {});
    }
});

const {actions, reducer} = moviesSlice;
export default reducer;
export const {setCurrentMovie} = actions;
export const sliceGetMovies = (state: RootState) => state.movies.movies;
export const sliceMovieIsLoading = (state: RootState) => state.movies.isLoading;