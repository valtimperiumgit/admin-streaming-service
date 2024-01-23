import { STATUS_CODES } from "http";
import IMovie from "../../entities/movie";
import { IPagination } from "../../entities/pagination";
import ITvShow from "../../entities/tv-show";
import { API_URL } from "../../settings/enviroment";
import axiosInstance from "../axios";
import ITvShowsPaginationResponse from "../responses/tv-shows-pagination-response";
import { HttpStatusCode } from "axios";
import { showSuccessToast } from "../../utilities/toast-service";
import IEditTvShowFileResponse from "../responses/edit-tv-show-file-response";
import { IEditTvShowRequest } from "../requests/tv-show/edit-tv-show-request";

export const createTvShow = async (request: FormData) => {

    var response = (await axiosInstance.post<IMovie>(`${API_URL}/admin/tv-shows`, request));

    if(response && response.status && response.status == HttpStatusCode.Ok){
        showSuccessToast("Success created")
    }

    return response;
};

export const getTvShows = async (pagination: IPagination) => {
    let url = `${API_URL}/admin/tv-shows?pageSize=${pagination.pageSize}&pageNumber=${pagination.pageNumber}`;
    var response = (await axiosInstance.get<ITvShowsPaginationResponse>(url)).data;
    return response;
};

export const editTvShow = async (request: IEditTvShowRequest) => {

    let response = (await axiosInstance.put<ITvShow>(`${API_URL}/admin/tv-shows`, request));

    if(response && response.status && response.status == HttpStatusCode.Ok){
        showSuccessToast("Success Edited")
    }

    return response;
}

export const editTvShowFile = async (request: FormData) => {

    let response = await axiosInstance.put<IEditTvShowFileResponse>(`${API_URL}/admin/tv-shows/files`, request);

    if(response && response.status && response.status == HttpStatusCode.Ok){
        showSuccessToast("Success Edited")
    }

    return response.data.value;
}


export const deleteTvShow = async (tvShowId: string) => {

    let response = await axiosInstance.delete(`${API_URL}/admin/tv-shows?tvShowId=${tvShowId}`);

    if(response && response.status && response.status == HttpStatusCode.Ok){
        showSuccessToast("Tv Show success deleted!")
    }

    return response;
}