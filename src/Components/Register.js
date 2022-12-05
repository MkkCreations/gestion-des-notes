import {useState} from 'react'
import { useAuth } from '../context/authContext'
import {useNavigate} from 'react-router-dom'

function Register() {

  const [user, setUser] = useState({
    email:"",
    password:"",
  });
  const {signup} = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({target: {name, value}}) => 
    setUser({...user, [name]: value});
  
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await signup(user.email, user.password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
    
  }
  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <div className='logindiv'>
      <div>
        <h2>Register</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input 
            type='email' 
            name='email'
            placeholder='youremail@exemple.com' 
            onChange={handleChange}
          />

          <label htmlFor='password' >Password</label>
          <input 
            type='password' 
            name='password' 
            id='password'
            onChange={handleChange}
          />

          <button>Register</button>
        </form>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default Register