import { useEffect, useState } from 'react'
import './App.css'
import SignUp from './pages/Signup'
import Login from './pages/Login';
import axios from 'axios';
import RestOfApp from './pages/RestOfApp';
import Auth from './pages/Auth';

function App() {

    const [user, setUser] = useState(null);
    const [checkedToken, setCheckedToken] = useState(false);

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
                setCheckedToken(true)
                console.log(res);
                if (res.status == 200 && res.data) {
                    setUser(res.data);
                }
            }).catch((err) => {
                setCheckedToken(true)
                console.log("something wrong with token", err);
            })
        } else {
            setCheckedToken(true)
        }
    }, [])

 return (
    <>
    {/* if we are still checking, show nothing. */}
    {/* then, check if the answer */}
    {!checkedToken ? <></> : user ? <RestOfApp /> : <Auth setUser={setUser} />}

    </>


 )
}

export default App
