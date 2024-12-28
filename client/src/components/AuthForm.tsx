import authService from "../services/AuthService";
import "../styles/AuthForm.css";
import {saveUserToLocalStorage, UserAPI} from "../utils/LocalStorage";

interface AuthProps {
    formType: 'sign-in' | 'sign-up';
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function AuthForm({formType} : AuthProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const userData = {
      firstName: String(formData.get('firstName')),
      lastName: String(formData.get('lastName')),
      email: String(formData.get('email')),
      password: String(formData.get('password'))
    }

    try {
      const userAPI: UserAPI =
          (formType === 'sign-up')
              ? await authService.signUp(userData)
              : await authService.signIn(userData.email, userData.password);

      saveUserToLocalStorage(userAPI, userData);
      console.log('ssss');
    } catch (error) {
      console.error('Error during authentication:', error);
  }
  };
  return(
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        {formType === 'sign-up' && (
          <>
            <input name="firstName" type="text" placeholder="First Name" />
            <input name="lastName" type="text" placeholder="Last Name" />
          </>
        )}
        <input name="email" type="email" placeholder="Email Address" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">
          {formType === 'sign-up' ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
  </div>
  );
}

export default AuthForm;