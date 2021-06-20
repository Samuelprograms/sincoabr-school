import React, { useState } from "react";
import "./../css/Class.css";

const Class = ({ data, setData }) => {
  const [newClass, setNewClass] = useState("");
  const [error, setError] = useState({ message: null, state: null });
  const regex = {
    regexClass: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  };

  const addClass = (select, e) => {
    e.preventDefault();
    if (newClass.trim().length === 0) {
      setError({
        ...error,
        message: "Please insert the name of the class",
        state: true,
      });
    } else if (!regex.regexClass.test(newClass)) {
      setError({ ...error, message: "invalid name", state: true });
    } else {
      setError({ ...error, state: false });

      let oldData = [...data];
      for (const iterator of oldData) {
        if (iterator.teacher === select) {
          if (iterator["subject"]) {
            if (
              !(
                iterator.subject[newClass.toLowerCase()] ===
                newClass.toLowerCase()
              )
            ) {
              iterator.subject[newClass.toLowerCase()] = [];
            }
          } else {
            iterator["subject"] = {};
            iterator.subject[newClass.toLowerCase()] = [];
          }
        }
      }
      setData(oldData);
    }
  };

  return (
    <div className="class">
      {error.state && (
        <p style={{ color: "red", fontSize: "15px", textAlign: "center" }}>
          {error.message}
        </p>
      )}
      <input
        required
        type="text"
        placeholder="Class to Add"
        onChange={(e) => setNewClass(e.target.value)}
      />
      <div className="class__buttons">
        <h2>Select the Teacher</h2>
        {data.map((info) => (
          <button onClick={(e) => addClass(info.teacher, e)}>
            {info.teacher}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Class;
