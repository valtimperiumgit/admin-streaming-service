import { useFormik } from "formik";
import "../login/Login.css"
import ILoginRequest from "../../api/requests/auth/login-request";
import { login } from "../../api/services/auth-service";

function Login() {

    const formik = useFormik<ILoginRequest>({
        initialValues: {
            email: "",
            password: ""
        },

        onSubmit: values => {
            login(values);
      },
      });

    return (
      <div className="login">
        <form onSubmit={formik.handleSubmit} className="login-form">
            <input id="email" name="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email}/>
            <input id="password" name="password" type="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password}/>
            <button > Login </button>
        </form>
      </div>
    );
  }
  
  export default Login;