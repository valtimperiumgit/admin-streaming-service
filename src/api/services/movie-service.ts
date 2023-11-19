import IMovie from "../../entities/movie";
import { API_URL } from "../../settings/enviroment";
import axiosInstance from "../axios"

export const getMovies = async () => {
    return (await axiosInstance.get<IMovie[]>(`${API_URL}/admin/movies`)).data;
}