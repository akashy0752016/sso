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
import { useEffect, useState } from 'react';

const CLIENT_ID = 'Iv23limd5FCKhbUWfN5A';

function App() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    if(codeParam && (localStorage.getItem('accessToken') === null)) {
      async function getAccessToken() {
        await fetch('http://localhost:4000/getAccessToken?code=' + codeParam, {
          method: 'GET'
        }).then((response) => {
          return response.json();
        }).then((data) => {
            console.log(data);
            if(data.access_token) {
              localStorage.setItem('accessToken', data.access_token);
              setRerender(!rerender);
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
    <> 
      {localStorage.getItem('accessToken') ? <h1>Test</h1> : <div id="login" onLoad={loginWithGitHub}>Login</div>}
      <Router> 
        <Routes> 
          <Route path="/Home" element={<Home />} /> 
        </Routes> 
      </Router> 
    </> 
  );
}

export default App;
