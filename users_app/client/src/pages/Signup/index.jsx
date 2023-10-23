import axios from 'axios';
import  { useState } from 'react'

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
      });
      const [message, setMessage] = useState('');
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios({
            url: "/server/signup",
            method: "POST",
            data: formData
          });
          setMessage(response.data.message || 'Signup successful!');
        } catch (error) {
          setMessage(error.response?.data?.message || 'Error during signup.');
        }
      }
    
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button type="submit">Signup</button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      );
}

export default SignUp