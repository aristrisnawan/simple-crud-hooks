import axios from "axios";
import React, { useState, useEffect } from "react";
import { Input, Button, Form } from "reactstrap";
import { uid } from "uid";
import TableComponent from "./TableComponent";

function FormTambahData() {
  const [updated, setUpdated] = useState([
    {
      id: null,
      status: false,
    },
  ]);

  const [biodata, setBiodata] = useState([
    {
      id: 1,
      name: "Aris",
      pekerjaan: "Programmer",
      usia: 20,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    pekerjaan: "",
    usia: 0,
  });

  //untuk menampilkan data
  useEffect(() => {
    axios.get("http://localhost:3000/biodata").then((response) => {
      setBiodata(response?.data ?? []);
    });
  }, []);

  //Handle for onChange
  function handleChange(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  //For Handel Submit
  function handleSubmit(e) {
    e.preventDefault();
    let data = [...biodata];

    //Untuk handle jika field kosong
    if ((formData.name && formData.pekerjaan) === "") {
      return false;
    }
    if (formData.usia === 0) {
      return false;
    }

    if (updated.status) {
      data.forEach((bio) => {
        if (bio.id === updated.id) {
          bio.name = formData.name;
          bio.pekerjaan = formData.pekerjaan;
          bio.usia = formData.usia;
        }
      });
      axios.put(`http://localhost:3000/biodata/${updated.id}`,{
        name:formData.name,
        pekerjaan: formData.pekerjaan,
        usia: formData.usia
      })
    } else {
      let newData = {
        id: uid(),
        name: formData.name,
        pekerjaan: formData.pekerjaan,
        usia: formData.usia,
      };
      data.push(newData);

      axios.post('http://localhost:3000/biodata', newData)
      .then((response) => {
        alert("Sukses menambah data")
      })
    }

    setUpdated({ id: null, status: false });
    setBiodata(data);
    setFormData({
      name: "",
      pekerjaan: "",
      usia: 0,
    });
  }

  //Handle for edit
  function handleEdit(id) {
    let data = [...biodata];
    let foundData = data.find((found) => found.id === id);
    setFormData({
      name: foundData.name,
      pekerjaan: foundData.pekerjaan,
      usia: foundData.usia,
    });
    setUpdated({ id: id, status: true });
  }

  //Handel for Delete
  function handleDelete(id) {
    let data = [...biodata];
    let filterData = data.filter((bio) => bio.id !== id);
    
    axios.delete(`http://localhost:3000/biodata/${id}`)
    .then((response) => {
      alert("Delete success")
    })
    setBiodata(filterData);
  }

  return (
    <div className="mt-3 ">
      <div className="tbl">
        <Form onSubmit={handleSubmit}>
          <Input
            className="mb-2"
            value={formData.name}
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Masukan Nama Anda"
          />
          <Input
            className="mb-2"
            onChange={handleChange}
            value={formData.pekerjaan}
            name="pekerjaan"
            type="text"
            placeholder="Masukan Pekejaan Anda"
          />
          <Input
            className="mb-2"
            onChange={handleChange}
            value={formData.usia}
            name="usia"
            type="number"
            placeholder="Masukan Usia Anda"
          />
          <Button color="primary" style={{ width: "100%" }}>
            Submit
          </Button>
        </Form>
      </div>
      <TableComponent
        data={biodata}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default FormTambahData;
