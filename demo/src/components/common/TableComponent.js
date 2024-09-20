import React from 'react';

const TableComponent = ({ data }) => {
  const headers = Object.keys(data[0]);
  const rows = data.map(item => Object.values(item));

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
              {headers.map(header => <th scope="col" key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => {
                return <td key={index}>{
                  (typeof cell === 'boolean' || Array.isArray(cell)) ? cell.toString() : cell
                  }</td>;
                })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;