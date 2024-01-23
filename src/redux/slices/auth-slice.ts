import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import IAdmin from "../../entities/admin";

interface IState
{
    admin: IAdmin | null,
    token: string | null
}

const initialState : IState = {
    admin: {} as any,
    token: localStorage.getItem("token")
};



const authSlice = createSlice({name: 'authSlice', initialState, reducers: {
    clearAuth: (state) => {
        state.token = null;
        state.admin = null;
      },
},
  extraReducers: builder => {
    builder
      .addDefaultCase(() => {});
    }
});

const {actions, reducer} = authSlice;
export const {clearAuth} = actions;
export default reducer;
export const sliceAuth = (state: RootState) => state.auth;