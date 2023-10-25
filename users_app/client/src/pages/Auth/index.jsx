import React from 'react'
import Login from '../Login'
import SignUp from '../Signup'

const Auth = ({setUser}) => {
  return (
    <>
        <SignUp /> 
        <Login setUser={setUser} />
    </>
  )
}

export default Auth