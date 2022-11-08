import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledTextField } from '../form-input/form-input.component';
import { StyledLoadingButton } from '../button/loading-button.component';

import { signInUserWithEmailAndPassword, analytics, isUserAdmin } from '../../util/firebase/firebase.utils';

import './sign-in-form.styles.scss';
import { UserContext } from '../../contexts/user.context';

const defaultFormFields = {
  email: '',
  password: '',
};



const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [loading, setLoading] = useState(false);
  const { email, password } = formFields;
  
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      setLoading(true);
      const { user } = await signInUserWithEmailAndPassword(email, password);
      resetFormFields();
      setCurrentUser(user);
      const response = await isUserAdmin();
      console.log(response);

      if(response) {
        // user is allowed access direct to home page
        setLoading(false);
        navigate('/');
      } else {
        // user account isn't permitted and is signed out
        alert("Sorry you are not permitted to use this website. Please try another account.");
        setLoading(false);
      }
      
    } catch (error) {
        switch(error.code){
            case 'auth/wrong-password':
                alert("Those details don't match. Please try again.");
                break;
            case 'auth/user-not-found': 
                alert("The details entered doesn't match an account. Please try again.");
                break;
            default:
                analytics.logEvent("sign_in_error", error);
        }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-in-container'>
      <form onSubmit={handleSubmit} className='form'>
        <h2 className='signInTitle'>Sign in</h2>
        <StyledTextField
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
          variant="standard"
          id='standard-required'
        />

        <StyledTextField
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
          variant="standard"
          id='standard-required'
        />

        <StyledLoadingButton loading={loading} type='submit' variant='contained'>Sign in</StyledLoadingButton>
      </form>
    </div>
  );
};

export default SignInForm;