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
import ConfigJson from "./config.json";


const CLIENT_ID = 'Ov23liL5MFCO0aHzPn5o';

function App() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLogedIn,setLoggedIn]=useState(false);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");

  useEffect(() => {
    
    //console.log("code :"+ codeParam);
    //console.log(codeParam !== null);
    //console.log(localStorage.getItem('accessToken') === null);
    if(codeParam !== null && (localStorage.getItem('accessToken') === null)) {
      getAccessToken();
    }
  }, []);

  async function getAccessToken() {
    await fetch('http://localhost:4000/getAccessToken?code=' + codeParam, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {
        //console.log(data);
      if (data.access_token) {
        getUserData(data.access_token);
        
          //navigate("/home")
          //setRerender(!rerender);
        }
    });
  }

  async function getUserData(token) {
    fetch('http://localhost:4000/getUserData', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
        //console.log(data);
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userName', data.login);
        localStorage.setItem('avatar_url', data.avatar_url);
        localStorage.setItem('html_url', data.html_url);
        setLoggedIn(true);
        window.location.href = "http://localhost:3000/home";
    });
  }

  function loginWithGitHub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + ConfigJson['git-hub-client-id']);
  }

  return ( 
  <header className="App-header">
    
    <>
      <RouteApp/>
        {!localStorage.getItem('accessToken') ?
          <>
            <main>
            <div className="container">

            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                    <div className="d-flex justify-content-center py-4">
                        <a href="index.html" className="logo d-flex align-items-center w-auto">
                        <img src="./img/logo.png" alt="" />
                        <span className="d-none d-lg-block">{ConfigJson.title}</span>
                        </a>
                    </div>

                    <div className="card mb-3">

                        <div className="card-body">

                        <div className="pt-4 pb-2">
                            <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                        </div>

                        <form className="row g-3 needs-validation" noValidate>

                            <div className="col-12">
                            <button className="btn btn-primary w-100" type="button" onClick={loginWithGitHub}>Login</button>
                            </div>
                        </form>

                        </div>
                    </div>

                    </div>
                </div>
                </div>

            </section>

            </div>
        </main>
          </>
          :
          <></>
            //window.location.href = "http://localhost:3000/home"
          
        }
        
            
          
    </>
  </header>
);
}

export default App;
