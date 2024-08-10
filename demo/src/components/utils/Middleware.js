export function checkIsLoggedIn() {
    let iAmBoolean = false;
    if ((localStorage.getItem("accessToken") !== null && localStorage.getItem("accessToken") !== "") &&
    (localStorage.getItem("userName") !== null && localStorage.getItem("userName") !== "")) {
        iAmBoolean = true;
    } else {
        localStorage.removeItem('accessToken'); 
        localStorage.removeItem('userName'); 
        localStorage.removeItem('avatar_url'); 
        localStorage.removeItem('html_url'); 
    }
    return iAmBoolean;
};

export function getAccessToken(code) {
    fetch('http://localhost:4000/getAccessToken?code=' + code, {
            method: 'GET'
          }).then((response) => {
            return response.json();
          }).then((data) => {
            if (data.access_token) {
              getUserData(data.access_token);
            }
        }).catch((error) => {
            console.log(error);
        });
}
export function getUserData(token) {
    fetch('http://localhost:4000/getUserData', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then((response) => {
        return response.json();
      }).then((data) => {
          localStorage.setItem('accessToken', token);
          localStorage.setItem('userName', data.login);
          localStorage.setItem('avatar_url', data.avatar_url);
          localStorage.setItem('html_url', data.html_url);
      }).catch((error) => {
        console.log(error);
    });
}