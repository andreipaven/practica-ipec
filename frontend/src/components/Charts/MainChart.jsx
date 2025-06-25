import { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  fetchGetDayReport,
  fetchGetReports,
  fetchGetReportsCustomPeriod,
} from "../../Services/reportService.js";
import useResponsive from "../Hooks/useResponsive.jsx";

function MainChart({
  period,
  equipment,
  startDate,
  endDate,
  lastChanged,
  setTotalConsumption,
  customEquipments,
}) {
  const { isSmallScreen } = useResponsive();
  const [series, setSeries] = useState([]);

  const path = useRef(null);

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

  const handleMultiEquipmentResult = (result) => {
    console.log(result);
    if (!result.success || !result.result) return;

    const rawData = result.result;

    const equipmentMap = {};

    rawData.forEach(({ day, equipment, daily_consumption }) => {
      if (!day || daily_consumption === undefined || !equipment) return;

      const dateObj = new Date(day);
      if (isNaN(dateObj)) return;

      const timestamp = dateObj.getTime() + 2 * 60 * 60 * 1000; // +2h pentru fus orar

      if (!equipmentMap[equipment]) {
        equipmentMap[equipment] = [];
      }

      equipmentMap[equipment].push({
        x: timestamp,
        y: daily_consumption,
      });
    });

    // opțional: calculează totalul doar pentru echipamentele vizibile
    let total = 0;
    Object.values(equipmentMap).forEach((points) => {
      total += points.reduce((acc, p) => acc + p.y, 0);
    });
    setTotalConsumption(total);

    // construim `series`
    const newSeries = Object.entries(equipmentMap).map(([equipment, data]) => ({
      name: equipment,
      data,
    }));

    setSeries(newSeries);
  };

  const handleResult = (result) => {
    console.log(result.result);
    if (result.success) {
      const rawData = result.result;

      const chartData = rawData
        .map(({ day, daily_consumption }) => {
          if (!day || daily_consumption === undefined) return null;
          let dateObj = null;
          if (period === "2025-06-16") {
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
      const total = uniqueData.reduce((acc, point) => acc + point.y, 0);
      setTotalConsumption(total);

      setSeries([
        {
          name: "Energy consumption",
          data: uniqueData,
        },
      ]);
    }
  };

  useEffect(() => {
    console.log(customEquipments);
  }, [customEquipments]);

  useEffect(() => {
    if (period && equipment && lastChanged === "default") {
      path.current = false;
    } else if (
      startDate &&
      endDate &&
      customEquipments &&
      lastChanged === "custom"
    ) {
      path.current = true;
    }

    if (path.current === false) {
      if (period === "2025-06-16") {
        fetchGetDayReport(period, equipment).then(handleResult);
      } else {
        fetchGetReports(period, equipment).then(handleResult);
      }
    } else if (path.current === true) {
      fetchGetReportsCustomPeriod(startDate, endDate, customEquipments).then(
        handleMultiEquipmentResult,
      );
    }
  }, [period, equipment, endDate, startDate, lastChanged, customEquipments]);

  return (
    <div style={{ width: "100%", margin: "auto", overflow: "hidden" }}>
      <ReactApexChart
        options={state.options}
        series={series}
        type="area"
        height={isSmallScreen ? 300 : 400}
      />
    </div>
  );
}

export default MainChart;
