import axios, { HttpStatusCode } from "axios";
import { showErrorToast, showSuccessToast } from "../utilities/toast-service";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuth } from "../redux/slices/auth-slice";
import { STATUS_CODES } from "http";

const axiosInstance = axios.create({});


axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {

        if (error.response?.status === HttpStatusCode.Unauthorized) {

            localStorage.removeItem('token'); 
            
        }

        else if(error.response.data.detail){
            showErrorToast(error.response.data.detail)
        }
        else if (error.response.data) {
            console.log(error.response)
            getValidationErrors(error.response.data);
        }
    }
);

function getValidationErrors(data: any) {
    let errors: any[] = [];

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            errors = errors.concat(data[key]);
        }
    }

    errors.map((error) => {showErrorToast(error);})
}

export default axiosInstance;