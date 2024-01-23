import IAdmin from "../../entities/admin";

export interface IAdminLoginResponse{
    admin: IAdmin,
    token: string
}