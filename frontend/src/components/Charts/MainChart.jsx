import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { fetchGetReports } from "../../Services/reportService.js";

function MainChart({ period }) {
  const [series, setSeries] = useState([]);

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
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy HH:mm:ss",
        },
      },
    },
  });

  useEffect(() => {
    fetchGetReports("2025-01-01").then((result) => {
      if (result.success) {
        console.log(result.result);
        const rawData = result.result;

        const chartData = rawData
          .map(({ CREATED, VAL }) => {
            if (!CREATED || VAL === undefined) return null;
            const dateObj = new Date(CREATED.replace(" ", "T"));
            if (isNaN(dateObj)) return null;
            return {
              x: dateObj.getTime(),
              y: VAL,
            };
          })
          .filter(Boolean);

        // Elimină punctele cu timestamp duplicat (păstrează primul apărut)
        const uniqueData = [];
        const seenTimestamps = new Set();
        for (const point of chartData) {
          if (!seenTimestamps.has(point.x)) {
            seenTimestamps.add(point.x);
            uniqueData.push(point);
          }
        }

        setSeries([
          {
            name: "Consum energie",
            data: uniqueData,
          },
        ]);
      }
    });
  }, []);

  return (
    <div style={{ width: "100%", margin: "auto", overflow: "hidden" }}>
      <ReactApexChart
        options={state.options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
}

export default MainChart;
