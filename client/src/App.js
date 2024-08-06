import logo from './logo.svg';
import './App.css';
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
    <div className="App">
      <header className="App-header">
        {localStorage.getItem('accessToken') ? 
          <>
          <h1>We have the access token</h1>
          <button onClick={() => {localStorage.removeItem('accessToken'); setRerender(!rerender);}}>
            Log Out
          </button>
          <h3>Get data from GitHub Api</h3>
          <button onClick={getUserData}>Get Data</button>
          {Object.keys(userData).length !== 0 ?
            <>
              <h4>Hey there {userData.login}</h4>
              <img width='100px' height='100px' src={userData.avatar_url}></img>
              <a href={userData.html_url} style={{'color': 'white'}}>Link to Github</a>
            </>
            :
            <>
            </>
          }
          </>
          :
          <>
          <h3>User not logged in</h3>
          <button onClick={loginWithGitHub}>
            Login with GitHub
          </button>
          </>
        }
      </header>
    </div>
  );
}

export default App;
