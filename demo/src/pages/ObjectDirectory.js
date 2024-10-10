import React from "react";
import { useEffect, useState } from "react";
import configData from "../config.json";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import TableComponent from "../components/common/TableComponent";
import PrettyPrintJson from "../components/common/PrettyPrintJson";
//import formSchema from '../components/common/formSchema.json';
import DynamicForm from "../components/common/DynamicForm";
import {fetchRawFileFromUrlPromise, fetchData, getService, processFormData} from "../components/helper/helper.js";
import { v4 as uuid } from 'uuid';
import {Buffer} from 'buffer';

const ObjectDirectory = () => {
    const [data, setData] = useState([]);
    const [objectDirectorylement, setObjectDirectorylement] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const objectId = useParams().objectId;
    const [textarea, setTextarea] = useState();
    const [formSchema, setFormSchema] = useState([]);
    const [gitHubObj, setGitHubObj] = useState();
    const [formUuid, setFormUuid] = useState([]);
    
    const handleFormSubmit = (formData) => {
        var element = document.getElementsByName("uuid");
        //console.log(element[0].value);        
        //console.log('Form Data:', formData);
        //console.log(typeof(formData));
        const newData = {uuid: element[0].value, ...formData}
        //console.log(newData)
        //formData["uuid"] = element[0].value;
        //let temp["uuid"] = element[0].value;
        //console.log('Form Data:', formData);
        let message = newData.message;
        delete newData.message;
        //console.log(JSON.stringify(newData, null, 2));
        //console.log({"message": message, content: Buffer.from(JSON.stringify(newData, null, 2)).toString('base64') });
        fetch("http://localhost:4000/update-file-content", {
            method: 'POST',
            body: JSON.stringify({
                "owner": gitHubObj.owner,
                "repo": gitHubObj.repo,
                "branch": gitHubObj.branch,
                "path": gitHubObj.path+"/"+newData.uuid+".json",
                "data": {"message": message, content: Buffer.from(JSON.stringify(newData, null, 2)).toString('base64') }
            }),
            headers: {'Content-Type':'application/json', "Authorization": 'Bearer ' + localStorage.getItem("accessToken")}
        }).then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data);
            if(alert('Data saved successfully.')){}
            else    window.location.reload(); 
        });
    };
    useEffect(() => {
        document.title = configData.title+ " | Home";
        document.getElementById("footer").classList.add('footer');
        let gitHubObj = configData.data.find((e) => {
            if(e.id === objectId)
                return e
        });
        let service = getService(gitHubObj.service);
        if(gitHubObj.id !== null && service.name !== null) {
            setObjectDirectorylement({
                "title": gitHubObj.title
            });
            (async () => {
                getData(gitHubObj);
            })();
        }
    }, []);

    function getData(gitHubObj) {
        if(gitHubObj.type === 'directory') {
            fetchData("getContent", gitHubObj)
            .then((data) => {
                setGitHubObj(gitHubObj);
                //console.log(data);
                //console.log(data.filter(u=>!(u.name.startsWith("formData"))));
                if(!!data.find(u=>u.name.startsWith("formData"))) {
                    fetchRawFileFromUrlPromise(data.find(u=>u.name.startsWith("formData")).download_url)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        let id = uuid();
                        let formData = processFormData(data);
                        //console.log(data[0]);
                        //console.log(data[0].fields.filter(u=>(u.type==='select')));
                        setFormSchema(formData);
                        setFormUuid(id);
                        //console.log($("[name='uuid']"));
                        //document.getElementsByName("uuid")[0].value=id;
                    });
                }
                if(data.filter(u=>!(u.name.startsWith("formData")))) {
                    fetchRawFileFromUrlPromise(data.find(u=>!(u.name.startsWith("formData"))).download_url)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        setData(data);
                        setIsLoading(false);
                    });
                }
            });
        } else {
            fetchData("fetchData", gitHubObj)
            .then((data) => {
                setData(data.objectDirectory);
                setIsLoading(false);
                setGitHubObj(gitHubObj);
            });
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
                    <section className="section">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-body">
                                        {isLoading ? 
                                            <><h5 className="card-title">Loading</h5></>
                                            :
                                            <>
                                                <h5 className="card-title d-flex justify-content-between align-items-center">
                                                    {objectDirectorylement.title} 
                                                    {gitHubObj &&
                                                        <button type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#fullscreenModal">
                                                            <i className="bi bi-plus"></i>
                                                        </button>
                                                    }
                                                </h5>
                                                <TableComponent data={data} formSchema={formSchema} />
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
                </div>
                {isLoading ? <></>:<>
                <div className="modal fade" id="fullscreenModal" tabindex="-1">
                    <div className="modal-dialog modal-fullscreen">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add/Update Object</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <DynamicForm schema={formSchema} onSubmit={handleFormSubmit} tempUuid={formUuid} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                </>}
            </main>
        </Layout>
    );
};

export default ObjectDirectory;
