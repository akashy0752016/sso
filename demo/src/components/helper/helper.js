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
