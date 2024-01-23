import { HttpStatusCode } from "axios";
import { API_URL } from "../../settings/enviroment";
import { showSuccessToast } from "../../utilities/toast-service";
import axiosInstance from "../axios";
import { IAdminLoginResponse } from "../responses/admin-login-response";
import ILoginRequest from "../requests/auth/login-request";

export const login = async (request: ILoginRequest) => {

    var response = (await axiosInstance.post<IAdminLoginResponse>(`${API_URL}/admin/authentication/login`, request));

    console.log(response);

    if(response && response.status && response.status == HttpStatusCode.Ok){
        showSuccessToast("You are logged in to your account!")
    }

    return response;
};