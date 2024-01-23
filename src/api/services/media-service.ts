import { API_URL } from "../../settings/enviroment";
import axiosInstance from "../axios";
import IActorsResponse from "../responses/actors-response";
import ICountriesResponse from "../responses/countries-response";
import ICreatorsResponse from "../responses/creators-response";
import IGenresResponse from "../responses/genres-response";

const getGenresQuery = `
{
  genres {
    id,
    name
  }
}`;

const getActorsQuery = `
{
  actors {
    id,
    name
  }
}`;

const getCreatorsQuery = `
{
  creators {
    id,
    name
  }
}`;

const getCountriesQuery = `
{
  countries {
    id,
    name
  }
}`;

export const getGenres = async () => {
    try {
      const response = await axiosInstance.post<IGenresResponse>(`${API_URL}/graphql`, { query: getGenresQuery });
      return response.data.data.genres;
    } 
    catch (error) {
      console.error('Error GraphQL:', error);
    }
  }

  export const getActors = async () => {
    try {
      const response = await axiosInstance.post<IActorsResponse>(`${API_URL}/graphql`, { query: getActorsQuery });
      return response.data.data.actors;
    } 
    catch (error) {
      console.error('Error GraphQL:', error);
    }
  }

  export const getCreators = async () => {
    try {
      const response = await axiosInstance.post<ICreatorsResponse>(`${API_URL}/graphql`, { query: getCreatorsQuery });
      return response.data.data.creators;
    } 
    catch (error) {
      console.error('Error GraphQL:', error);
    }
  }

  export const getCountries = async () => {
    try {
      const response = await axiosInstance.post<ICountriesResponse>(`${API_URL}/graphql`, { query: getCountriesQuery });
      return response.data.data.countries;
    } 
    catch (error) {
      console.error('Error GraphQL:', error);
    }
  }