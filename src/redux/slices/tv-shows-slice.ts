import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import ITvShow from "../../entities/tv-show";
import { createTvShow, getTvShows } from "../../api/services/tv-show-service";
import { IPagination } from "../../entities/pagination";
import ISeason from "../../entities/season";
import IEpisode from "../../entities/episode";
import { createEpisode } from "../../api/services/episodes-service";

interface IState
{
  tvShows: ITvShow[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  currentTvShow: ITvShow;
  currentSeasons: ISeason[];
  currentEpisodes: IEpisode[];
  isLoading: boolean;
  isCreatingTvShowLoading: boolean;
  isCreatingEpisodeLoading: boolean;
}

const initialState : IState = {
  tvShows: [],
  currentPage: 0,
  pageSize: 0,
  totalItems: 0,
  currentTvShow: {} as any,
  currentSeasons: [],
  currentEpisodes: [],
  isLoading: false,
  isCreatingTvShowLoading: false,
  isCreatingEpisodeLoading: false
};

export const onGetTvShows = createAsyncThunk("tvShowsSlice/tvShows", async (pagination: IPagination) => getTvShows(pagination));
export const onCreateTvShow = createAsyncThunk("tvShowsSlice/crateTvShow", async (data: FormData) => createTvShow(data));
export const onCreateEpisode = createAsyncThunk("tvShowsSlice/crateEpisode", async (data: FormData) => createEpisode(data));

const tvShowsSlice = createSlice({name: 'tvShowsSlice', initialState, reducers: {
  setCurrentTvShow: (state, action) => {
    state.currentTvShow = action.payload;
  },
  setCurrentSeasons: (state, action) => {
    state.currentSeasons = action.payload;
  },
  editCurrentSeason: (state, action) => {
    state.currentSeasons = state.currentSeasons.map(season => 
      season.id === action.payload.id ? action.payload : season
    );
  },
  addCurrentSeason: (state, action) => {
    state.currentSeasons = [...state.currentSeasons, action.payload];
  },
  deleteCurrentSeason: (state, action) => {
    state.currentSeasons = state.currentSeasons.filter(season => season.id !== action.payload);
  },


  setCurrentEpisodes: (state, action) => {
    state.currentEpisodes = action.payload;
  },
  editCurrentEpisode: (state, action) => {
    state.currentEpisodes = state.currentEpisodes.map(episode => 
      episode.id === action.payload.id ? action.payload : episode
    );
  },
  deleteCurrentEpisode: (state, action) => {
    state.currentEpisodes = state.currentEpisodes.filter(episode => episode.id !== action.payload);
  }
},
  extraReducers: builder => {
    builder
    .addCase(onGetTvShows.pending, (state) => {
      state.isLoading = true;
    })
    builder
      .addCase(onGetTvShows.fulfilled, (state, {payload}) => {
        state.tvShows = payload.value.items;
        state.pageSize = payload.value.pageSize;
        state.currentPage = payload.value.currentPage;
        state.totalItems = payload.value.totalItems;
        state.isLoading = false;
      })
      .addCase(onGetTvShows.rejected, (state) => {
        state.isLoading = false;
      })
      builder
      .addCase(onCreateTvShow.pending, (state) => {
        state.isCreatingTvShowLoading = true;
      })
      builder
        .addCase(onCreateTvShow.fulfilled, (state, {payload}) => {
          state.isCreatingTvShowLoading = false;
          
        })
        .addCase(onCreateTvShow.rejected, (state) => {
          state.isCreatingTvShowLoading = false;
        })

        builder
        .addCase(onCreateEpisode.pending, (state, payload) => {
          state.isCreatingEpisodeLoading = true;
        })
        builder
          .addCase(onCreateEpisode.fulfilled, (state, {payload}) => {
            state.currentEpisodes = [...state.currentEpisodes, payload.data];
            state.isCreatingEpisodeLoading = false;
          })
          .addCase(onCreateEpisode.rejected, (state) => {
            state.isCreatingEpisodeLoading = false;
          })  
      .addDefaultCase(() => {});
    }
});

const {actions, reducer} = tvShowsSlice;
export default reducer;

export const {deleteCurrentSeason, deleteCurrentEpisode, editCurrentEpisode, setCurrentTvShow, setCurrentSeasons, editCurrentSeason, addCurrentSeason, setCurrentEpisodes} = actions;
export const sliceGetTvShows = (state: RootState) => state.tvShows;
