import React, { useState } from "react";
import "./../css/Teacher.css";

const Teacher = ({ data, setData }) => {
  const [newTeacher, setNewTeacher] = useState("");
  const [teacherDeleted, setTeacherDeleted] = useState("");
  const [names, setNames] = useState([]);
  const [error, setError] = useState({ message: null, state: false });

  const regex = {
    regexName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  };

  const createTeacher = (e) => {
    e.preventDefault();
    if (newTeacher === "" || newTeacher.length === 0 || !newTeacher) {
      setError({
        ...error,
        message: "Please insert the name of the teacher to add it",
        state: true,
      });
    } else if (!regex.regexName.test(newTeacher)) {
      setError({ ...error, message: "Invalid name", state: true });
    } else {
      setNames([...names, newTeacher.toLowerCase().trim()]);
      if (!names.includes(newTeacher.toLowerCase().trim())) {
        setData([...data, { teacher: newTeacher.toLowerCase().trim() }]);
        setError({ ...error, state: false });
      } else {
        setError({
          ...error,
          message: "The teacher already exist",
          state: true,
        });
      }
    }
  };

  const deleteTeacher = () => {
    if (teacherDeleted.trim().length === 0) {
      setError({
        ...error,
        message: "Please insert the name of the teacher to delete it",
        state: true,
      });
    } else if (!regex.regexName.test(teacherDeleted)) {
      setError({
        ...error,
        message: "Invalid name",
        state: true,
      });
    } else {
      setError({ ...error, state: false });
      const oldData = [...data];
      const newData = oldData.filter(
        (info) =>
          info.teacher.toLowerCase().trim() !==
          teacherDeleted.toLowerCase().trim()
      );
      if (oldData.length === newData.length) {
        setError({
          ...error,
          message: "There is not a teacher with that name",
          state: true,
        });
      } else {
        setData(newData);
      }
    }
  };

  return (
    <div className="teacher">
      {error.state && (
        <p style={{ color: "red", fontSize: "15px", textAlign: "center" }}>
          {error.message}
        </p>
      )}
      <div className="teacher__form">
        <div className="form__inputs">
          <input
            required
            placeholder="Teacher to add"
            type="text"
            onChange={(e) => setNewTeacher(e.target.value)}
          />
          <button onClick={(e) => createTeacher(e)}>Create teacher</button>
        </div>
        <div className="form__inputs">
          <input
            required
            placeholder="Teacher to delete"
            type="text"
            onChange={(e) => setTeacherDeleted(e.target.value)}
          />
          <button onClick={() => deleteTeacher()}>Delete teacher</button>
        </div>
      </div>
      <ul style={{ color: "white" }}>
        <h2>Teachers</h2>
        {data.map((info, index) => (
          <li key={index}>{info.teacher}</li>
        ))}
      </ul>
    </div>
  );
};

export default Teacher;
