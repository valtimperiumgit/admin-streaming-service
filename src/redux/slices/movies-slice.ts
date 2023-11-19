import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import IMovie from "../../entities/movie";
import { getMovies } from "../../api/services/movie-service";
import { RootState } from "../store";

interface IState
{
  movies: IMovie[],
}

const initialState : IState = {
  movies: []
};

export const onGetMovies = createAsyncThunk("moviesSlice/movies", async () => getMovies());

const moviesSlice = createSlice({name: 'moviesSlice', initialState, reducers: {},
  extraReducers: builder => {
    builder
      .addCase(onGetMovies.fulfilled, (state, {payload}) => {
        state.movies = payload;
      })
      .addDefaultCase(() => {});
    }
});

const {actions, reducer} = moviesSlice;
export default reducer;
export const sliceGetMovies = (state: RootState) => state.movies.movies;