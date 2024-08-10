import React from 'react';
const PrettyPrintJson = ({data}) => (
    <>
        <h5 className="card-title d-flex justify-content-between align-items-center">Object JSON</h5>
        <div className="container"><pre>{JSON.stringify(data, null, 4) }</pre></div>
    </>
);
export default PrettyPrintJson;