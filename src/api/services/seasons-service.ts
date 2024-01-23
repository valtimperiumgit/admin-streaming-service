import { HttpStatusCode } from "axios";
import { API_URL } from "../../settings/enviroment";
import { showSuccessToast } from "../../utilities/toast-service";
import axiosInstance from "../axios";
import IGetSeasonsResponse from "../responses/get-seasons-response";
import ICreateSeasonRequest from "../requests/tv-show/create-season-request";
import ISeason from "../../entities/season";
import IEditSeasonRequest from "../requests/tv-show/edit-season-request";

export const getSeasons = async (tvShowId: string) => {

    var response = (await axiosInstance.get<IGetSeasonsResponse>(`${API_URL}/admin/seasons?tvShowId=${tvShowId}`));
    return response.data.value;
};

export const createSeason = async (request: ICreateSeasonRequest) => {
    var response = (await axiosInstance.post<ISeason>(`${API_URL}/admin/seasons`, request));

    if(response && response.status && response.status == HttpStatusCode.Ok){
        showSuccessToast("Season success created!")
    }

    return response;
}

export const editSeason = async (request: IEditSeasonRequest) => {
    var response = (await axiosInstance.put<ISeason>(`${API_URL}/admin/seasons`, request));

    if(response && response.status && response.status == HttpStatusCode.Ok){
        showSuccessToast("Season success edited!")
    }

    return response;
}

export const deleteSeason = async (seasonId: string | undefined) => {
    var response = (await axiosInstance.delete(`${API_URL}/admin/seasons?seasonId=${seasonId}`));

    if(response && response.status && response.status == HttpStatusCode.Ok){
        showSuccessToast("Season deleted!")
    }

    return response;
}