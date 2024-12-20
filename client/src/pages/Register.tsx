import AuthForm from "../components/AuthForm";
import "../styles/Auth.css";
function Register() {
    return(
    <div className="auth-container">
        <AuthForm formType="sign-up"/>
    </div>
    );
}

export default Register;