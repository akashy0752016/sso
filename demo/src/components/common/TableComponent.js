import React from 'react';
import DynamicForm from './DynamicForm';

const TableComponent = ({ data, formSchema }) => {
  const headers = [...Object.keys(data[0]), "action"];
  const rows = data.map(item => {
    return {...item, 'action': item.uuid}
  });

  const handleEdit = (uuid) => {
    const row = rows.find(row => row.uuid === uuid);
    //document.getElementById('#fullscreenEdit #uuid').value = 
    console.log(document.querySelector("#fullscreenEdit .formData"));
    //document.getElementsByClassName("formData").reset();
    document.querySelector("#fullscreenEdit .formData").reset();
    let obj = data.find(u => u.uuid === uuid);
    Object.keys(obj).forEach(function(k){
      console.log(k + ' - ' + obj[k]);
      document.querySelector("#fullscreenEdit #" + k).value=obj[k];
    });
    //console.log(document.querySelector("#fullscreenEdit #uuid"));
    
  }
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
              {headers.map(header => <th scope="col" key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
            {rows.map((row, index) => {
               return <tr key={index}>
                   {headers.map((key, index) => {
                      if(key === 'action') {
                        return <td id={key} key={row[key]}><button className="btn btn-sm btn-warning" onClick={(event) => handleEdit(row[key])} data-bs-toggle="modal" data-bs-target="#fullscreenEdit"><i className="bi bi-pencil"></i></button></td>
                      } else {
                        return <td id={key} key={row[key]}>{row[key]}</td>
                      }
                   })}
             </tr>;
            })}
          
        </tbody>
      </table>
      <div className="modal fade" id="fullscreenEdit" tabindex="-1">
        <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Edit Object</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <DynamicForm schema={formSchema} onSubmit={""} tempUuid={""} />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
};

export default TableComponent;