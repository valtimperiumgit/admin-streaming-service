import IMedia from "./media";

export default interface IMovie {
    id: string;
    title: string;
    description: string;
    duration: number;
    maturityRating: number;
    imageUrl: string;
    videoUrl: string;
    trailerUrl: string;
    logoUrl: string;
    releaseDate: Date;
    countryId: string;
    movieGenres: IMedia[];
    movieActors: IMedia[];
    movieCreators: IMedia[];
}