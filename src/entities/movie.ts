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
    countryId: number;
}