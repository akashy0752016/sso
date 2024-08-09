import React from "react";
import { useEffect } from "react";
import configData from "../config.json";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";

const ObjectDirectory = () => {
    const objectId = useParams().objectId;
    useEffect(() => {
        document.title = configData.title+ " | Home";
        document.getElementById("footer").classList.add('footer');
        const data = configData.data;
        let gitHubObj = data.find((e) => {
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
            fetchData();
        }
    }, []);
    async function fetchData() {
        await fetch("http://localhost:4000/fetchData", {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
        }).then((response) => {
            return response.json();
          }).then((data) => {
            console.log(data);
          });
    }
    function getService(serviceName) {
        return configData.services.find((service) => {
            console.log(serviceName);
            if(service.name === serviceName)
                return service
        })
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
                        <h5 className="card-title">Table with hoverable rows</h5>

                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Position</th>
                                <th scope="col">Age</th>
                                <th scope="col">Start Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Brandon Jacob</td>
                                <td>Designer</td>
                                <td>28</td>
                                <td>2016-05-25</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Bridie Kessler</td>
                                <td>Developer</td>
                                <td>35</td>
                                <td>2014-12-05</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Ashleigh Langosh</td>
                                <td>Finance</td>
                                <td>45</td>
                                <td>2011-08-12</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Angus Grady</td>
                                <td>HR</td>
                                <td>34</td>
                                <td>2012-06-11</td>
                            </tr>
                            <tr>
                                <th scope="row">5</th>
                                <td>Raheem Lehner</td>
                                <td>Dynamic Division Officer</td>
                                <td>47</td>
                                <td>2011-04-19</td>
                            </tr>
                            </tbody>
                        </table>

                        </div>
                    </div>

                    </div>
                </div>
                <div className="col-lg-4">
                </div>
                </section>

            </main>
        </Layout>
    );
};

export default ObjectDirectory;
