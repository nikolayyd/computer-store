import {Link} from "react-router-dom";
import AuthForm from "../components/AuthForm";
import "../styles/Auth.css";
function Login() {
    return(
        <div className="auth-container">
            <AuthForm formType="sign-in"/>
            <div className="register-option">
                <p>Don't have an account?</p>
                <Link to="/sign-up">
                    <span className="register-button">Sign Up</span>
                </Link>
            </div>
        </div>
    );
}

export default Login;