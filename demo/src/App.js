import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from './pages/Home';
import ObjectDirectory from './pages/ObjectDirectory';
import { useEffect, useState } from 'react'; 
import RouteApp from './components/common/route';
const CLIENT_ID = 'Ov23liL5MFCO0aHzPn5o';

function App() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLogedIn,setLogedIn]=useState(false)

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log("code :"+ codeParam);

    if(codeParam && (localStorage.getItem('accessToken') === null)) {
      async function getAccessToken() {
        await fetch('http://localhost:4000/getAccessToken?code=' + codeParam, {
          method: 'GET'
        }).then((response) => {
          return response.json();
        }).then((data) => {
            console.log(data);
          if (data.access_token) {
            getUserData();
            if(
              Object.keys(userData).length !== 0 ){
              localStorage.setItem('userName', userData.login);
            }
                
            
              localStorage.setItem('accessToken', data.access_token);
              setLogedIn(true)
              window.location.href = "http://localhost:3000/home";
              //setRerender(!rerender);
            }
        });
      }
      getAccessToken();
    }
  }, []);

  async function getUserData() {
    await fetch('http://localhost:4000/getUserData', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
        console.log(data);
        setUserData(data);
    });
  }

  function loginWithGitHub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
  }

  return ( 
  <header className="App-header">
    
    <>
      <RouteApp/>
        {!localStorage.getItem('accessToken') &&
          <>
        <h3>User not logged in</h3>
            <button onClick={loginWithGitHub}>
              Login with GitHub
          </button>
          </>
        }
        
            
          
    </>
  </header>
);
}

export default App;
