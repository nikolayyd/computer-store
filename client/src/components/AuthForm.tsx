import "../styles/AuthForm.css";
// import {saveUserToLocalStorage} from "../utils/LocalStorage";

interface AuthProps {
    formType: 'sign-in' | 'sign-up';
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function AuthForm({formType} : AuthProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formType === 'sign-up') {
      console.log('Signing up...');
      const formData = new FormData(event.currentTarget);
      // saveUserToLocalStorage(formData);
    } else {
      console.log('Signing in...');
      const formData = new FormData(event.currentTarget);
      console.log({
        email: formData.get('email'),
      });
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