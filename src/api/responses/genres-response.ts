import IMedia from "../../entities/media";

export default interface IGenresResponse{
    data: { genres: IMedia[] }
}