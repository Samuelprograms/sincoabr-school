import React, { useState } from "react";
import "./../css/Api.css";

const Api = ({ data }) => {
  const [showJson, setShowJson] = useState(true);

  return (
    <div className="api">
      <div className="api__buttons">
        <button onClick={() => setShowJson(true)}>JSON view</button>
        <button onClick={() => setShowJson(false)}>Table view</button>
      </div>
      {showJson ? (
        <pre>{JSON.stringify(data, null, 5)}</pre>
      ) : (
        <div className="api__table">
          <div className="api__table-body">
            {data.map((info) => (
              <div className="table__row">
                <p>
                  <strong>Teacher: </strong>
                  {info.teacher}
                </p>
                {Object.keys(info.subject).map((subject) => (
                  <div className="row__item">
                    <p>
                      <strong>Classes: </strong>
                      {subject}
                    </p>
                    <div>
                      {info.subject[subject].map((info) => (
                        <div className="row__item">
                          <p>
                            <strong>Student: </strong>
                            {info.name}
                          </p>
                          <p className="row__item">
                            <strong>Qualifications: </strong>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <i>first: {info.qualifications.first}</i>
                              <i>second: {info.qualifications.second}</i>
                            </div>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Api;
