import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import "./App.css";

function App() {
  const [isLoading, setIsloading] = useState(false);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    loadMeasurements(false);
  }, []);

  const loadMeasurements = (persist) => {
    fetch(`/api/measurement?persist=${persist}`)
      .then((response) => response.json())
      .then((data) => setMeasurements(data))
      .then(() => {
        setIsloading(false);
      });
  };

  const requestUpdate = () => {
    setIsloading(true);
    loadMeasurements(true);
  };

  return (
    <div className="App">
      <center>
        <h1>Mauna Loa Eruption Detector</h1>

        <button onClick={() => requestUpdate()}>Get new measurement</button>
        <br />
        <br />
        {isLoading ? (
          <p>Loading...</p>
        ) : measurements.length === 0 ? (
          <i>No data found yet...</i>
        ) : (
          <table
            width={"480px"}
            cellSpacing={"4px"}
            cellPadding={"2px"}
            border="1"
          >
            <thead>
              <tr>
                <th>Time</th>
                <th>Temperature (C)</th>
                <th>Danger level</th>
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
        return (
          <tr key={element.time}>
            <td align="center">
              {DateTime.fromSeconds(element.time).toRelative()}
            </td>
            <td align="center">{element.temperature}</td>
            <td align="center">{dangerLevel(element.temperature)}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

const dangerLevel = (temperature) => {
  if (temperature > 30) return "Moderate";
  else if (temperature > 50) return "Start Running";
  else if (temperature > 100) return "Eruption!";
  else return "No danger";
};

export default App;
