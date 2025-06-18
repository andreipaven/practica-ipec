import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function LineChart() {
  const [state] = useState({
    options: {
      chart: {
        id: "basic-line",
        zoom: {
          enabled: true,
          type: "x",
        },
        toolbar: {
          show: false,
          tools: {
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
      },
      stroke: {
        curve: "smooth", // <--- aici faci linia rotundă
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
    },
    series: [
      {
        name: "Vânzări",
        data: [
          [new Date("2024-01-01").getTime(), 30],
          [new Date("2024-01-02").getTime(), 40],
          [new Date("2024-01-03").getTime(), 35],
          [new Date("2024-01-04").getTime(), 50],
          [new Date("2024-01-05").getTime(), 49],
          [new Date("2024-01-06").getTime(), 60],
        ],
      },
    ],
  });

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
      />
    </div>
  );
}
export default LineChart;
