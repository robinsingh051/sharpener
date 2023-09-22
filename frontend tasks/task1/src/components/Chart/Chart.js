import React from "react";

import "./Chart.css";
import CharBar from "./ChartBar";
const Chart = (props) => {
  const dataPointsValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  const maxValue = Math.max(...dataPointsValues);
  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <CharBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={maxValue}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
