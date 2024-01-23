import { useSelector } from "react-redux";
import { sliceAuth } from "../redux/slices/auth-slice";
import { useNavigate } from "react-router-dom";
import Main from "../pages/main/main";
import { useEffect } from "react";

function MainWithAuth() {
    let navigate = useNavigate();
    let token = useSelector(sliceAuth).token;

    useEffect(() => {
        if (token === null) {
            navigate("/login");
        }
    }, [token, navigate]);

    return <Main />;
}

export default MainWithAuth;