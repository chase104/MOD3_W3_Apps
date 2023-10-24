import { useEffect, useState } from 'react'
import './App.css'
import SignUp from './pages/Signup'
import Login from './pages/Login';
import axios from 'axios';

function App() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        let token = localStorage.getItem("user_token");
        if (token) {
            // take token to server and verify it, come back with a response
            axios({
                method: "GET",
                url: "/server/check_token",
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                console.log(res);
                if (res.status == 200 && res.data) {
                    setUser(res.data);
                }
            })
        }
    }, [])

 return (
    <>
    {user ? <div>Youre logged in! {user.username}</div> : <></>}
    <SignUp /> 
    <Login setUser={setUser} />
    </>


 )
}

export default App
