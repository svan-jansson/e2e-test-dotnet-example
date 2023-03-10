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
            <td align="center">
              <span
                style={{
                  height: "10px",
                  width: "10px",
                  backgroundColor: dangerColor(element.temperature),
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "5px",
                }}
              ></span>
              {dangerLevel(element.temperature)}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

const dangerLevel = (temperature) => {
  if (temperature <= 30) return "No danger";
  else if (temperature <= 50) return "Start packing";
  else if (temperature <= 75) return "Start running";
  else if (temperature <= 100) return "It's gonna blow!";
  else return "Eruption!";
};

const dangerColor = (temperature) => {
  if (temperature <= 30) return "green";
  else if (temperature <= 50) return "yellow";
  else if (temperature <= 75) return "orange";
  else if (temperature <= 100) return "orangered";
  else return "red";
};

export default App;
