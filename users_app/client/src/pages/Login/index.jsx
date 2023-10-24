import React, { useState } from 'react'
import axios from 'axios'

const Login = ({setUser}) => {
    const [formData, setFormData] = useState({
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
            url: "/server/login",
            method: "POST",
            data: formData
          });
          console.log(response);
          localStorage.setItem("user_token", response.data.token)
          if (response.data.dbUser) {
            setUser(response.data.dbUser)
          }
          setMessage(response.data.message || 'Login successful!');
        } catch (error) {
          setMessage(error.response?.data?.message || 'Error during signup.');
        }
      }
    
      return (
        <div>
          <form onSubmit={handleSubmit}>
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
              <button type="submit">Login</button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      );
}

export default Login