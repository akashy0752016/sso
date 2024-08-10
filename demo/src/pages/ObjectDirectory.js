import React from "react";
import { useEffect, useState } from "react";
import configData from "../config.json";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import TableComponent from "../components/common/TableComponent";
import PrettyPrintJson from "../components/common/PrettyPrintJson";

const ObjectDirectory = () => {
    const [data, setData] = useState([]);
    const [objectDirectorylement, setObjectDirectorylement] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const objectId = useParams().objectId;
    useEffect(() => {
        document.title = configData.title+ " | Home";
        document.getElementById("footer").classList.add('footer');
        let gitHubObj = configData.data.find((e) => {
            if(e.id === objectId)
                return e
        });
        let service = getService(gitHubObj.service);
        if(gitHubObj.id !== null && service.name !== null) {
            let viewUrl = service.urlPatternView.replace("owner", gitHubObj.owner)
            .replace("repo", gitHubObj.repo)
            .replace("branch", gitHubObj.branch)
            .replace("path", gitHubObj.path);
            let editUrl = service.urlPatternEdit.replace("owner", gitHubObj.owner)
            .replace("repo", gitHubObj.repo)
            .replace("branch", gitHubObj.branch)
            .replace("path", gitHubObj.path);
            let rawUrl = service.rawPatternView.replace("owner", gitHubObj.owner)
            .replace("repo", gitHubObj.repo)
            .replace("branch", gitHubObj.branch)
            .replace("path", gitHubObj.path);
            setObjectDirectorylement({
                "title": gitHubObj.title,
                "editUrl": editUrl,
                "viewUrl": viewUrl
            });
            console.log(rawUrl);
            (async () => {
                fetchData(gitHubObj);
            })();
        }
    }, []);
    function fetchData(gitHubObj) {
        fetch("http://localhost:4000/fetchData", {
            method: 'POST',
            body: JSON.stringify({
                "owner": gitHubObj.owner,
                "repo": gitHubObj.repo,
                "branch": gitHubObj.branch,
                "path": gitHubObj.path
            }),
            headers: {'Content-Type':'application/json'}
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            setData(data);
            setIsLoading(false);
        });
    }
    function getService(serviceName) {
        return configData.services.find((service) => {
            console.log(serviceName);
            if(service.name === serviceName)
                return service
        })
    }
    console.log(data);
    console.log(objectDirectorylement);
    
    return (
        <Layout>
            <main id="main" className="main">

                <div className="pagetitle">
                <h1>Directory</h1>
                <nav>
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item active"><a href="/home">Home</a></li>
                    </ol>
                </nav>
                </div>

                <section className="section">
                <div className="row">
                    <div className="col-lg-8">

                    <div className="card">
                        <div className="card-body">
                        
                        {isLoading ? <h5 className="card-title">Loading</h5> : <><h5 className="card-title d-flex justify-content-between align-items-center">{objectDirectorylement.title} <a class="btn btn-sm btn-primary" target="_blank" href={objectDirectorylement.editUrl}><i class="bi bi-pen"></i></a></h5><TableComponent data={data.objectDirectory} /></>}
                        </div>
                    </div>

                    </div>
                    <div className="col-lg-4">
                        {isLoading ? <></>:
                        <>
                            <div className="card">
                                <div className="card-body">
                                    <PrettyPrintJson data={data} />
                                </div>
                            </div></>}
                    </div>
                </div>
                
                </section>

            </main>
        </Layout>
    );
};

export default ObjectDirectory;
