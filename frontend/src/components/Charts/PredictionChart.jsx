import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  fetchGetPredictReports,
  fetchGetPredictReportsWeek,
  fetchGetReports,
} from "../../Services/reportService.js";
import useResponsive from "../Hooks/useResponsive.jsx";
import themeColors from "../../Themes/themeColors.jsx";
import { ToastContainer } from "react-toastify";
import { notify } from "../Notifications/notify.js";

function PredictionChart({ predictPeriod, predictEquipment }) {
  const { isSmallScreen } = useResponsive();
  const [series, setSeries] = useState([]);
  const [historicalSeries, setHistoricalSeries] = useState([]);
  const [predictedSeries, setPredictedSeries] = useState([]);

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

  const handleResult = (result) => {
    if (result.success) {
      const rawData = result.result;

      const chartData = rawData
        .map(({ day, daily_consumption }) => {
          if (!day || daily_consumption === undefined) return null;
          let dateObj;
          if (predictPeriod === "2025-06-16") {
            dateObj = new Date(day.replace(" ", "T"));
          } else {
            dateObj = new Date(day);
          }

          if (isNaN(dateObj)) return null;
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

      setHistoricalSeries([
        {
          name: "Historical Consumption",
          data: uniqueData,
        },
      ]);
    } else {
      notify('notify("This equipment has not been operating recently!");');
    }
  };
  const handlePredictResult = (result) => {
    if (result.success) {
      const rawData = result.result;
      let baseDate = null;
      if (predictPeriod === "2025-05-17") {
        baseDate = new Date("2025-05-18T00:00:00");
      } else if (predictPeriod === "2025-06-10") {
        baseDate = new Date("2025-06-02T00:00:00");
      }

      const chartData = rawData
        .map(({ day_of_month, average_consumption }) => {
          if (!day_of_month || average_consumption === undefined) return null;

          const dateObj = new Date(baseDate);
          dateObj.setDate(baseDate.getDate() + (day_of_month - 1));

          if (isNaN(dateObj)) return null;
          return {
            x: dateObj.getTime() + 2 * 60 * 60 * 1000,
            y: average_consumption,
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

      setPredictedSeries([
        {
          name: "Predict Consumption",
          data: uniqueData,
        },
      ]);
    }
  };

  useEffect(() => {
    if (predictEquipment && predictPeriod) {
      if (predictPeriod === "2025-06-10") {
        fetchGetReports(predictPeriod, predictEquipment).then(handleResult);
        fetchGetPredictReportsWeek(predictEquipment).then(handlePredictResult);
      } else if (predictPeriod === "2025-05-17") {
        fetchGetReports(predictPeriod, predictEquipment).then(handleResult);
        fetchGetPredictReports(predictEquipment).then(handlePredictResult);
      }
    }
  }, [predictPeriod, predictEquipment]);

  useEffect(() => {
    setSeries([...historicalSeries, ...predictedSeries]);
  }, [historicalSeries, predictedSeries]);

  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        overflow: "hidden",
        backgroundColor: themeColors.palette.primary.light,
      }}
    >
      <ReactApexChart
        options={state.options}
        series={series}
        type="area"
        height={isSmallScreen ? 300 : 400}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default PredictionChart;
