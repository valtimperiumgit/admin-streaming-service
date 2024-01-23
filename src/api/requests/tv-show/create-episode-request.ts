export default interface ICreateEpisodeRequest{
    title: string;
    seasonId: string;
    number: number;
    video: File | null;
}