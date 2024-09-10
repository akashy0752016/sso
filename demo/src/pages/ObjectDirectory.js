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
    const [textarea, setTextarea] = useState();
    const [gitHubObj, setGitHubObj] = useState();
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
            setObjectDirectorylement({
                "title": gitHubObj.title,
                "editUrl": editUrl,
                "viewUrl": viewUrl
            });
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
            headers: {'Content-Type':'application/json', "Authorization": 'Bearer ' + localStorage.getItem("accessToken")}
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setData(data);
            setTextarea(JSON.stringify(data, null, 2));
            setIsLoading(false);
            setGitHubObj(gitHubObj);
        });
    }
    function getService(serviceName) {
        return configData.services.find((service) => {
            console.log(serviceName);
            if(service.name === serviceName)
                return service
        })
    }
    console.log(gitHubObj);
    //console.log(objectDirectorylement);

    const handleChange = (event) => {
        setTextarea(event.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            fetch("http://localhost:4000/get-branch", {
                method: 'POST',
                body: JSON.stringify({
                    "owner": gitHubObj.owner,
                    "repo": gitHubObj.repo,
                    "branch": gitHubObj.branch,
                }),
                headers: {'Content-Type':'application/json', "Authorization": 'Bearer ' + localStorage.getItem("accessToken")}
            }).then((response) => {
                return response.json();
            }).then((data) => {
                const sha = data.commit.sha;
                const treeSha = data.commit.commit.tree.sha
                fetch("http://localhost:4000/get-trees", {
                    method: 'POST',
                    body: JSON.stringify({
                        "owner": gitHubObj.owner,
                        "repo": gitHubObj.repo,
                        "branch": gitHubObj.branch,
                        "data": {
                            "base_tree": treeSha
                        }
                    }),
                    headers: {'Content-Type':'application/json', "Authorization": 'Bearer ' + localStorage.getItem("accessToken")}
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    const blobSha = data.tree.find((e) => {
                        if(e.path === gitHubObj.path)
                            return e
                    }).sha;
                    fetch("http://localhost:4000//update-file-content", {
                        method: 'POST',
                        body: JSON.stringify({
                            "owner": gitHubObj.owner,
                            "repo": gitHubObj.repo,
                            "branch": gitHubObj.branch,
                            "path": gitHubObj.path,
                            "data": {
                                "message":"Format Json 11",
                                "content": "ewogICJvYmplY3REaXJlY3RvcnkiOiBbCiAgICB7CiAgICAgICJUZXN0IjogInRlc3QiCiAgICB9LAogICAgewogICAgICAiVGVzdCI6ICJ0ZXN0IgogICAgfSwKICAgIHsKICAgICAgIlRlc3QiOiAidGVzdDEyMzQiCiAgICB9CiAgXQp9",
                                "sha": blobSha
                            }
                        }),
                        headers: {'Content-Type':'application/json', "Authorization": 'Bearer ' + localStorage.getItem("accessToken")}
                    }).then((response) => {
                        return response.json();
                    }).then((data) => {
                        setData(data);
                        setTextarea(JSON.stringify(data, null, 2));
                        setIsLoading(false);
                        setGitHubObj(gitHubObj);
                    });
                });
            });
        } catch (err) {
            if (err.response.status === 500) {
                console.log("There was a problem with the server.");
            } else {
                console.log(err.response.data.msg);
            }
        }
    }
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
                        
                        {isLoading ? 
                            <h5 className="card-title">Loading</h5> 
                            : 
                            <>
                                <h5 className="card-title d-flex justify-content-between align-items-center">
                                    {objectDirectorylement.title} 
                                    {gitHubObj &&
                                        <button type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#fullscreenModal">
                                            <i className="bi bi-pen"></i>
                                        </button>
                                    }
                                </h5>
                                <TableComponent data={data.objectDirectory} />
                            </>
                        }
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
                <div class="spinner-grow spinner-grow-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <form onSubmit={onSubmit}>
                <div className="modal fade" id="fullscreenModal" tabindex="-1">
                    <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title">Edit Object Directory</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                gitHubObj &&
                                <>
                                    <input type="hidden" value={gitHubObj.id} name="id" />
                                    <input type="hidden" value={gitHubObj.branch} name="branch" />
                                    <input type="hidden" value={gitHubObj.owner} name="owner" />
                                    <input type="hidden" value={gitHubObj.path} name="path" />
                                    <input type="hidden" value={gitHubObj.repo} name="repo" />
                                </>
                            }
                            <div class="row mb-3" style={{height: '80%'}}>
                                <label for="inputText" class="col-sm-2 col-form-label">Update Content</label>
                                <div class="col-sm-10">
                                <textarea className="form-control" style={{height: '100%'}} value={textarea} onChange={handleChange} />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputText" class="col-sm-2 col-form-label">Text</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" id="saveChanges" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                    </div>
                </div>
              </form>
            </main>
        </Layout>
    );
};

export default ObjectDirectory;
