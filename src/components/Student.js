import React, { useState } from "react";
import "./../css/Student.css";

const Student = ({ data, setData }) => {
  const [newStudent, setNewStudent] = useState("");
  const [qualifications, setQualifications] = useState({
    first: "",
    second: "",
  });
  const [search, setSearch] = useState("");
  const [error, setError] = useState({ message: null, state: null });
  const regex = {
    regexName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    regexQualification: /^[+]?([0-4]?(?:[\.][0-9]*)?|\.[0-9])$/,
  };

  const validateExistingStudent = (info) => {
    for (const iterator of info) {
      return iterator.name === newStudent ? false : true;
    }
  };

  const addStudent = (teacher, matter, e) => {
    e.preventDefault();
    if (newStudent.trim().length === 0) {
      setError({
        ...error,
        message: "Please insert the name of the student",
        state: true,
      });
    } else if (!regex.regexName.test(newStudent)) {
      setError({ ...error, message: "invalid name", state: true });
    } else if (!regex.regexQualification.test(qualifications.first)) {
      setError({
        ...error,
        message: "the first qualification is invalid (0-5)",
        state: true,
      });
    } else if (!regex.regexQualification.test(qualifications.second)) {
      setError({
        ...error,
        message: "the second qualification is invalid (0-5)",
        state: true,
      });
    } else {
      let oldData = [...data];
      setError({ ...error, state: false });
      for (const iterator of oldData) {
        if (iterator.teacher === teacher) {
          let exist = validateExistingStudent(iterator.subject[matter]);
          if (exist) {
            iterator.subject[matter].qualifications = qualifications;
            if (iterator.subject[matter]) {
              iterator.subject[matter].push({
                name: newStudent,
                qualifications: qualifications,
              });
            }
          } else {
            iterator.subject[matter] = [];
            iterator.subject[matter].push({
              name: newStudent,
              qualifications: qualifications,
            });
          }
        }
      }
      setData(oldData);
    }
  };

  const handleOnChange = (e) => {
    setQualifications({ ...qualifications, [e.target.name]: e.target.value });
  };

  return (
    <div className="student">
      {error.state && (
        <p style={{ color: "red", fontSize: "15px", textAlign: "center" }}>
          {error.message}
        </p>
      )}
      <input
        required
        placeholder="Student Name"
        type="text"
        onChange={(e) => setNewStudent(e.target.value)}
      />
      <input
        required
        placeholder="Firts Qualification (0-5)"
        name="first"
        type="text"
        onChange={(e) => handleOnChange(e)}
      />
      <input
        required
        placeholder="Second Qualification (0-5)"
        name="second"
        type="text"
        onChange={(e) => handleOnChange(e)}
      />
      <div className="buttons">
        <input
          type="text"
          placeholder="Teacher & Class"
          onChange={(e) => setSearch(e.target.value)}
        />
        {data.map((info) => {
          return Object.keys(info.subject)
            .filter(
              (matter) =>
                info.teacher.includes(search) || matter.includes(search)
            )
            .map((matter) => (
              <button onClick={(e) => addStudent(info.teacher, matter, e)}>
                {info.teacher}
                {"  "}
                {matter}
              </button>
            ));
        })}
      </div>
    </div>
  );
};

export default Student;
