import React, { useState } from "react";
import Class from "./components/Class";
import Teacher from "./components/Teacher";
import Student from "./components/Student";
import Api from "./components/Api";
import "./App.css";

function App() {
  const [screen, setScreen] = useState({ id: 1, avaliable: true });
  const [newData, setNewData] = useState([]);

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
