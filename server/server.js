var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const fetch = (...args) => 
    import('node-fetch').then(({default: fetch}) => fetch(...args))

const CLIENT_ID = 'Iv23limd5FCKhbUWfN5A';
const CLIENT_SECRET = '640d6e40ea2d22037e662e18524c89fd4c8295a0';

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function (req, res) {
    console.log(req.query.code);

    const params = '?scope=repo%2Cgist&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&code=' + req.query.code;

    await fetch('https://github.com/login/oauth/access_token' + params, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        console.log(response);
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    });
});

app.get('/getUserData', async function (req, res) {
    req.get('Authorization'); // Bearer AccessToken
    console.log(req);
    await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
           'Authorization': req.get('Authorization')
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    });
})

app.post('/fetchData', async function (req, res) {
    await fetch("https://raw.githubusercontent.com/owner/repo/branch/path".replace("owner", req.body.owner)
    .replace("repo", req.body.repo)
    .replace("branch", req.body.branch)
    .replace("path", req.body.path), {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    });
})
app.listen(4000, function() {
    console.log('CORS Server running on port 4000')
});
