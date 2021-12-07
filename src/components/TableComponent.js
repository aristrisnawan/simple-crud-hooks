import React from "react";
import { Button, Table } from "reactstrap";

export default function TableComponent({ data, handleEdit, handleDelete }) {
  return (
    <div className="mt-3">
      <Table bordered>
        <thead>
          <tr>
            <td>No</td>
            <td>Nama</td>
            <td>Usia</td>
            <td>Pekerjaan</td>
            <td>Aksi</td>
          </tr>
        </thead>
        {data.map((bio, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{bio.name}</td>
                <td>{bio.usia}</td>
                <td>{bio.pekerjaan}</td>
                <td>
                  <Button className="btn btn-sm btn-warning" onClick={() => handleEdit(bio.id)} style={{marginRight:"5px"}}>Edit</Button>
                  <Button className="btn btn-sm btn-danger" onClick={() => handleDelete(bio.id)}>Delete</Button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}
