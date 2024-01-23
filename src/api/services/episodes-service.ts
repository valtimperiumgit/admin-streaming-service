import { HttpStatusCode } from "axios";
import IEpisode from "../../entities/episode";
import { API_URL } from "../../settings/enviroment";
import { showSuccessToast } from "../../utilities/toast-service";
import axiosInstance from "../axios";
import IEditEpisodeRequest from "../requests/tv-show/edit-episode-request";

export const getEpisodes = async (seasonId: string) => {

    var response = (await axiosInstance.get(`${API_URL}/admin/episodes?seasonId=${seasonId}`));
    return response.data.value;
};

export const createEpisode = async (request: FormData) => {

    var response = (await axiosInstance.post<IEpisode>(`${API_URL}/admin/episodes`, request));

    if(response && response.status && response.status == HttpStatusCode.Ok){
        showSuccessToast("Success created!")
    }

    return response;
};

export const editEpisode = async (request: IEditEpisodeRequest) => {

    var response = (await axiosInstance.put<IEpisode>(`${API_URL}/admin/episodes`, request));

    if(response && response.status && response.status == HttpStatusCode.Ok){
        showSuccessToast("Success edited!")
    }

    return response;
};

export const deleteEpisode = async (episodeId: string | undefined) => {

    var response = (await axiosInstance.delete<IEpisode>(`${API_URL}/admin/episodes?episodeId=${episodeId}`));

    if(response && response.status && response.status == HttpStatusCode.Ok){
        showSuccessToast("Success deleted!")
    }

    return response;
};