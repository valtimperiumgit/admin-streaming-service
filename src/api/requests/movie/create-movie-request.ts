export default interface ICreateMovieRequest{
    title: string;
    description: string;
    maturityRating: number;
    image: File | null,
    video: File | null,
    trailer: File | null,
    logo: File | null,
    releaseDate: Date;
    countryId: number;
    genres: string[];
    actors: string[];
    creators: string[];
}