var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const fetch = (...args) => 
    import('node-fetch').then(({default: fetch}) => fetch(...args))

const CLIENT_ID = 'Iv23limd5FCKhbUWfN5A';
const CLIENT_SECRET = 'd3610e655d2ddf4a72fa36ec0abeb8c31ba3530b';

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function (req, res) {
    const params = '?scope=repo%2Cgist&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&code=' + req.query.code;

    await fetch('https://github.com/login/oauth/access_token' + params, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    }).catch((error) => {
        console.log(error);
    });
});

app.get('/getUserData', async function (req, res) {
    req.get('Authorization'); // Bearer AccessToken
    await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
           'Authorization': req.get('Authorization')
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log(error);
    });
})

app.post('/fetchData', async function (req, res) {
    await fetch("https://raw.githubusercontent.com/owner/repo/branch/path".replace("owner", req.body.owner)
    .replace("repo", req.body.repo)
    .replace("branch", req.body.branch)
    .replace("path", req.body.path), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': req.get('Authorization')
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log(error);
    });
})
// Get Repository
app.post("/get-repo", async function (req, res) {
    await fetch(
        "https://api.github.com/repos/owner/repo-name".replace("owner", req.body.owner)
        .replace("repo-name", req.body.repo),
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': req.get('Authorization')
            }
        }
    ).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log(error);
    });
})

//Get Branch
app.post("/get-branch", async function (req, res) {
    await fetch(
        "https://api.github.com/repos/owner/repo-name/branches/branch-name".replace("owner", req.body.owner)
        .replace("repo-name", req.body.repo)
        .replace("branch-name", req.body.branch),
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': req.get('Authorization')
            }
        }
    ).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log(error);
    });
})

//Create Tree
app.post("/create-trees", async function (req, res) {
    console.log(JSON.stringify(req.body.data));
    await fetch(
        "https://api.github.com/repos/owner/repo-name/git/trees".replace("owner", req.body.owner)
        .replace("repo-name", req.body.repo),
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': req.get('Authorization')
            },
            body: JSON.stringify(req.body.data)
        }
    ).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log(error);
    });
})

//Get Tree
app.post("/get-trees", async function (req, res) {
    console.log(JSON.stringify(req.body.data));

    await fetch(
        "https://api.github.com/repos/owner/repo-name/git/trees/".replace("owner", req.body.owner)
        .replace("repo-name", req.body.repo) + req.body.data.base_tree,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': req.get('Authorization')
            }
        }
    ).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log(error);
    });
})

//Commit
app.post("/commit", async function (req, res) {
    console.log(JSON.stringify(req.body.data));
    await fetch(
        "https://api.github.com/repos/owner/repo-name/git/commits".replace("owner", req.body.owner)
        .replace("repo-name", req.body.repo),
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': req.get('Authorization')
            },
            body: JSON.stringify(req.body.data)
        }
    ).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log(error);
    });
})

//Create a reference
app.post("/create-reference", async function (req, res) {
    console.log(JSON.stringify(req.body.data));
    await fetch(
        "https://api.github.com/repos/owner/repo-name/git/refs".replace("owner", req.body.owner)
        .replace("repo-name", req.body.repo),
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': req.get('Authorization')
            },
            body: JSON.stringify(req.body.data)
        }
    ).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log(error);
    });
})

//Get a Blob
app.post("/get-a-blob", async function (req, res) {
    console.log(JSON.stringify(req.body.data));
    await fetch(
        "https://api.github.com/repos/owner/repo-name/git/blobs/sha".replace("owner", req.body.owner)
        .replace("repo-name", req.body.repo)
        .replace("sha", req.body.data.sha),
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': req.get('Authorization')
            }
        }
    ).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log(error);
    });
})

//Update Blob
app.post("/update-file-content", async function (req, res) {
    console.log(JSON.stringify(req.body.data));
    await fetch(
        "https://api.github.com/repos/owner/repo-name/contents/path".replace("owner", req.body.owner)
        .replace("repo-name", req.body.repo)
        .replace("path", req.body.path),
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': req.get('Authorization')
            },
            body: JSON.stringify(req.body.data)
        }
    ).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log(error);
    });
})

app.listen(4000, function() {
    console.log('CORS Server running on port 4000')
});
