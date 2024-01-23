import IMedia from "../../entities/media";

export default interface ICreatorsResponse{
    data: { creators: IMedia[] }
}