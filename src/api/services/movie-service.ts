import { HttpStatusCode } from "axios";
import IMovie from "../../entities/movie";
import { API_URL } from "../../settings/enviroment";
import { showSuccessToast } from "../../utilities/toast-service";
import axiosInstance from "../axios"
import IEditMovieRequest from "../requests/movie/edit-movie-request";

export const getMovies = async () => {
    return (await axiosInstance.get<IMovie[]>(`${API_URL}/admin/movies`)).data;
}

export const createMovie = async (request: FormData) => {

    var response = (await axiosInstance.post<IMovie>(`${API_URL}/admin/movies`, request));

    console.log(response);

    if(response && response.status && response.status == HttpStatusCode.Ok){
        showSuccessToast("Success created")
    }

    return response;
};

export const editMovie = async (request: IEditMovieRequest) => {

    var response = (await axiosInstance.put<IMovie>(`${API_URL}/admin/movies`, request));

    if(response && response.status && response.status == HttpStatusCode.Ok){
        showSuccessToast("Movie was Successful edited!")
    }

    return response;
};

export const editMovieFile = async (request: FormData) => {

    var response = (await axiosInstance.put<string>(`${API_URL}/admin/movies/files`, request));
    return response;
};

export const deleteMovie = async (movieId: string) => {

    let response = await axiosInstance.delete(`${API_URL}/admin/movies?movieId=${movieId}`);

    if(response && response.status && response.status == HttpStatusCode.Ok){
        showSuccessToast("Movie was successful deleted!")
    }

    return response;
}