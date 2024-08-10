import React from 'react';

const TableComponent = ({ data }) => {
  const headers = Object.keys(data[0]);
  const rows = data.map(item => Object.values(item));

  return (
    <table className="table table-hover">
      <thead>
        <tr>
            <th scope="col">#</th>
            {headers.map(header => <th scope="col" key={header}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <th scope="row">{index+1}</th>
            {row.map((cell, index) => <td key={index}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;