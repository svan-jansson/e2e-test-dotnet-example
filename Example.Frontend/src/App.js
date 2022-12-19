import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import "./App.css";

function App() {
  const [isLoading, setIsloading] = useState(false);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    loadMeasurements();
  }, []);

  const loadMeasurements = () => {
    fetch("/api/measurement")
      .then((response) => response.json())
      .then((data) => setMeasurements(data))
      .then(() => {
        setIsloading(false);
      });
  };

  const requestUpdate = () => {
    setIsloading(true);
    loadMeasurements();
  };

  return (
    <div className="App">
      <center>
        <h1>Mauna Loa Eruption Detector</h1>

        <button onClick={() => requestUpdate()}>Get current temperature</button>
        <br />
        <br />
        {isLoading ? (
          <p>Loading...</p>
        ) : measurements.length === 0 ? (
          <i>No data found yet...</i>
        ) : (
          <table cellPadding={"2px"}>
            <thead>
              <tr>
                <th align="left">Time</th>
                <th align="right">Temperature (C)</th>
              </tr>
            </thead>
            <MeasurementRows measurements={measurements} />
          </table>
        )}
      </center>
    </div>
  );
}

const MeasurementRows = (props) => {
  return (
    <tbody>
      {props.measurements.map((element) => {
        console.log(element);
        return (
          <tr key={element.time}>
            <td>{DateTime.fromSeconds(element.time).toRelative()}</td>
            <td>{element.temperature}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default App;
