interface AuthProps {
    formType: 'login' | 'register';
}

export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

function AuthForm({formType} : AuthProps) {
    return(
        <div>
            <form className="login-form">
                <input type="email" placeholder="Email adress: "/>
                <input type="password" placeholder="Password: "/>
            </form>
        </div>
    );
}

export default AuthForm;