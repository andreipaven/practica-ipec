import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  fetchGetDayReport,
  fetchGetReports,
} from "../../Services/reportService.js";
import useResponsive from "../Hooks/useResponsive.jsx";

function MainChart({ period, equipment }) {
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
          show: true,
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
    console.log(period);
    console.log(equipment);

    if (period && equipment) {
      const handleResult = (result) => {
        if (result.success) {
          const rawData = result.result;

          const chartData = rawData
            .map(({ day, daily_consumption }) => {
              if (!day || daily_consumption === undefined) return null;
              let dateObj = null;
              if (period === "2025-01-31") {
                dateObj = new Date(day.replace(" ", "T"));
              } else {
                dateObj = new Date(day);
              }

              if (isNaN(dateObj)) return null;
              console.log(dateObj);

              return {
                x: dateObj.getTime() + 2 * 60 * 60 * 1000,
                y: daily_consumption,
              };
            })
            .filter(Boolean);

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
      };

      if (period === "2025-01-31") {
        fetchGetDayReport(period, equipment).then(handleResult);
      } else {
        fetchGetReports(period, equipment).then(handleResult);
      }
    }
  }, [period, equipment]);

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
