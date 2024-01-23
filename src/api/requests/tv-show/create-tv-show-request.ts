import IMedia from "../../../entities/media";

export interface ICreateTvShowRequest {
    title: string,
    description: string,
    maturityRating: number,
    releaseDate: Date,
    countryId: number,
    genres: string[],
    actors: string[],
    creators: string[]
    image: File | null,
    trailer: File | null,
    logo: File | null
}