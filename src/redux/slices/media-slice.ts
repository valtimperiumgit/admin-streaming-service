import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import IMedia from "../../entities/media";
import { getActors, getCountries, getCreators, getGenres } from "../../api/services/media-service";

interface IState
{
    genres: IMedia[],
    actors: IMedia[],
    creators: IMedia[],
    countries: IMedia[]
}

const initialState : IState = {
    genres: [],
    actors: [],
    creators: [],
    countries: []
};

export const onGetGenres = createAsyncThunk("mediaSlice/genres", async () => getGenres());
export const onGetActors = createAsyncThunk("mediaSlice/actors", async () => getActors());
export const onGetCreators = createAsyncThunk("mediaSlice/creators", async () => getCreators());
export const onGetCountries = createAsyncThunk("mediaSlice/countries", async () => getCountries());

const mediaSlice = createSlice({name: 'mediaSlice', initialState, reducers: {},
  extraReducers: builder => {
    builder
      .addCase(onGetGenres.fulfilled, (state, {payload}) => {
        state.genres = payload || [];
      })
      .addCase(onGetCreators.fulfilled, (state, {payload}) => {
        state.creators = payload || [];
      })
      .addCase(onGetActors.fulfilled, (state, {payload}) => {
        state.actors = payload || [];
      })
      .addCase(onGetCountries.fulfilled, (state, {payload}) => {
        state.countries = payload || [];
      })

      .addDefaultCase(() => {});
    }
});

const {actions, reducer} = mediaSlice;
export default reducer;
export const sliceMedia = (state: RootState) => state.media;
export const getGenresSlice = (state: RootState) => state.media.genres;