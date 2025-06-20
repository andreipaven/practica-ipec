import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { fetchGetReports } from "../../Services/reportService.js";
import useResponsive from "../Hooks/useResponsive.jsx";

function MainChart({ period }) {
  const { isSmallScreen } = useResponsive();
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
      dataLabels: {
        enabled: false,
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
    fetchGetReports("2025-01-24", "TD7").then((result) => {
      if (result.success) {
        console.log(result.result);
        const rawData = result.result;

        const chartData = rawData
          .map(({ day, daily_consumption }) => {
            if (!day || daily_consumption === undefined) return null;
            const dateObj = new Date(day);
            if (isNaN(dateObj)) return null;
            return {
              x: dateObj.getTime(), // timestamp pentru ApexCharts
              y: daily_consumption, // valoarea consumului
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
        height={isSmallScreen ? 200 : 400}
      />
    </div>
  );
}

export default MainChart;
