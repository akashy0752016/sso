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

export const processFormData = (formData) => {
    let selectFields = formData[0].fields.filter(u => u.type === 'select');
    if (selectFields.length > 0) {
        selectFields = selectFields.map(u => {
            if(u.data !== null) {
                if(u.data.type === 'directory') {
                    fetchData("getContent", u.data)
                    .then((data) => {
                        if(data.find(e=>!(e.name.startsWith("formData")))) {
                            fetchRawFileFromUrlPromise(data.find(e=>!(e.name.startsWith("formData"))).download_url)
                            .then(responses => responses.json())
                            .then(json => {
                                u.options = json.map(x => {
                                    if(u.data.key in x) {
                                        return { label: x[u.data.key], value: x[u.data.key] };
                                    }
                                    
                                });
                            })

                        }
                    });
                } else {
                    fetchData("fetchData", u.data)
                    .then((data) => {
                        console.log(data);
                    });
                }
                
            }
            return u;
        });
        return formData.map(x => Object.assign(x, selectFields.find(y => y.name == x.name)));
    }
}
