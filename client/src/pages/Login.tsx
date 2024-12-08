import {Link} from "react-router-dom";
import AuthForm from "../components/AuthForm";

function Login() {
    return(
        <div>
            <AuthForm formType="login"/>
            <p>Don't have an account?</p>
            <Link to="/sign-up">
                <span className="signup-button">Sign Up</span>
            </Link>
        </div>
    );
}

export default Login;