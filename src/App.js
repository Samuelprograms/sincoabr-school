import React, { useState, useEffect } from "react";
import Class from "./components/Class";
import Teacher from "./components/Teacher";
import Student from "./components/Student";
import Api from "./components/Api";
import axios from "axios";
import "./App.css";

function App() {
  const [screen, setScreen] = useState({ id: 1, avaliable: true });
  const [oldData, setOldData] = useState([]);
  const [newData, setNewData] = useState([]);

  // const fetchData = async () => {
  //   await axios
  //     .get("https://60cd4c6a71b73400171f92c9.mockapi.io/users")
  //     .then((res) => setOldData([...oldData, res.data]));
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className="App">
      <div className="buttons">
        <button onClick={() => setScreen({ ...screen, id: 1 })}>
          Teacher Menu
        </button>
        {newData.length !== 0 && (
          <button onClick={() => setScreen({ ...screen, id: 2 })}>
            Classes Menu
          </button>
        )}
        {newData.length !== 0 && newData[0]["subject"] && (
          <button onClick={() => setScreen({ ...screen, id: 3 })}>
            Student Menu
          </button>
        )}
        <button onClick={() => setScreen({ ...screen, id: 4 })}>
          See data
        </button>
      </div>
      {screen.id === 1 && <Teacher data={newData} setData={setNewData} />}
      {screen.id === 2 && <Class data={newData} setData={setNewData} />}
      {screen.id === 3 && <Student data={newData} setData={setNewData} />}
      {screen.id === 4 && <Api data={newData} />}
    </div>
  );
}

export default App;
