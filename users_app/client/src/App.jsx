import { useState } from 'react'
import './App.css'
import SignUp from './pages/Signup'

function App() {

    const [user, setUser] = useState(null);


 return (
    <>
        {
            user ? <div>homepage</div> : <SignUp /> 
        }
    </>


 )
}

export default App
