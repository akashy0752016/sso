import configData from "../../config.json";

export const getService = (serviceName) => {
    return configData.services.find((service) => {
        if(service.name === serviceName)
            return service
    });
}

export const fetchRawFileFromUrlPromise = (url) => {
    return fetch(configData.serverEndpoints.uri+configData.serverEndpoints.getRawDataFromUrl,{
        method: 'POST',
        body: JSON.stringify({
            "url": url
        }),
        headers: {'Content-Type':'application/json', "Authorization": 'Bearer ' + localStorage.getItem("accessToken")}
    })
}

export const fetchData = (endpoint, gitObj) => {
    return fetch(configData.serverEndpoints.uri+configData.serverEndpoints[endpoint], {
        method: 'POST',
        body: JSON.stringify({
            "owner": gitObj.owner,
            "repo": gitObj.repo,
            "branch": gitObj.branch,
            "path": gitObj.path
        }),
        headers: {'Content-Type':'application/json', "Authorization": 'Bearer ' + localStorage.getItem("accessToken")}
    })
    .then((response) => {
        return response.json();
    })
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const processFormData = (formdata) => {
    //console.log(formdata);
    let selectFields = formdata[0].fields.filter(u => u.type === 'select');
    if (selectFields.length > 0) {
        //console.log(selectFields);
        selectFields = selectFields.map(u => {
            if(u.data !== null) {
                if(u.data.type === 'directory') {
                    fetchData("getContent", u.data)
                    .then((data) => {
                        //console.log(data);
                        return Promise.all(data.filter(u=>!(u.name.startsWith("formData"))).map(u=>fetchRawFileFromUrlPromise(u.download_url)))
                        .then(responses =>
                            Promise.allSettled(responses.map(res => res.json()))
                        ).then(json => {
                            u.options = json.map(e => {
                                return { label: e.value[u.data.key], value: e.value[u.data.key] };
                            });
                        });
                    });
                } else {
                    fetchData("fetchData", u.data)
                    .then((data) => {
                        console.log(data);
                        //setData(data.objectDirectory);
                        //setIsLoading(false);
                        //setGitHubObj(gitHubObj);
                    });
                }
                
            }
            return u;
        });
        console.log(selectFields);
        return formdata.map(x => Object.assign(x, selectFields.find(y => y.name == x.name)));
    }
}
