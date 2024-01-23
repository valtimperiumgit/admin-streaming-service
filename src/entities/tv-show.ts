import IMedia from "./media";

export default interface ITvShow {
    id: string;
    title: string;
    description: string;
    releaseDate: Date;
    maturityRating: number;
    imageUrl: string;
    trailerUrl: string;
    logoUrl: string;
    countryId: string;
    tvShowGenres: IMedia[];
    tvShowActors: IMedia[];
    tvShowCreators: IMedia[];
} 