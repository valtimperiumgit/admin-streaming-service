export interface IEditTvShowRequest {
    id: string,
    title: string,
    description: string,
    maturityRating: number,
    releaseDate: Date,
    countryId: number,
    genreIds: string[],
    actorIds: string[],
    creatorIds: string[]
}