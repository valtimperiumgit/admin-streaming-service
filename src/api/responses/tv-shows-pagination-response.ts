import ITvShow from "../../entities/tv-show";

export default interface ITvShowsPaginationResponse{
     value: { items: ITvShow[], currentPage: number, pageSize: number, totalItems: number }
}