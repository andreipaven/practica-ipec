const ip = import.meta.env.MY_IP || "localhost";
const port = import.meta.env.PORT || 5000;

export const fetchGetReports = async (period, equipment) => {
  try {
    const response = await fetch(`http://${ip}:${port}/api/report/get-period`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ period: period, equipment: equipment }),
    });
    const data = await response.json();

    return response.ok
      ? { success: true, message: data.message, result: data.data }
      : {
          success: false,
          message: data.message || "Unknown error",
          result: data.data,
        };
  } catch (e) {
    return { success: false, message: "Network error. Please try again." + e };
  }
};
export const fetchGetDayReport = async (period, equipment) => {
  try {
    const response = await fetch(`http://${ip}:${port}/api/report/get-day`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ period: period, equipment: equipment }),
    });
    const data = await response.json();

    return response.ok
      ? { success: true, message: data.message, result: data.data }
      : {
          success: false,
          message: data.message || "Unknown error",
          result: data.data,
        };
  } catch (e) {
    return { success: false, message: "Network error. Please try again." + e };
  }
};
export const fetchGetEquipments = async () => {
  try {
    const response = await fetch(
      `http://${ip}:${port}/api/report/get-equipments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();

    return response.ok
      ? { success: true, message: data.message, result: data.data }
      : {
          success: false,
          message: data.message || "Unknown error",
          result: data.data,
        };
  } catch (e) {
    return { success: false, message: "Network error. Please try again." + e };
  }
};

export const fetchGetReportsCustomPeriod = async (start, end, equipment) => {
  try {
    const response = await fetch(
      `http://${ip}:${port}/api/report/get-custom-period`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start: start,
          end: end,
          equipment: equipment,
        }),
      },
    );
    const data = await response.json();

    return response.ok
      ? { success: true, message: data.message, result: data.data }
      : {
          success: false,
          message: data.message || "Unknown error",
          result: data.data,
        };
  } catch (e) {
    return { success: false, message: "Network error. Please try again." + e };
  }
};

export const fetchGetPredictReports = async (equipment) => {
  try {
    const response = await fetch(
      `http://${ip}:${port}/api/report/get-predict-period`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ equipment: equipment }),
      },
    );
    const data = await response.json();

    return response.ok
      ? { success: true, message: data.message, result: data.data }
      : {
          success: false,
          message: data.message || "Unknown error",
          result: data.data,
        };
  } catch (e) {
    return { success: false, message: "Network error. Please try again." + e };
  }
};
export const fetchGetPredictReportsAll = async () => {
  try {
    const response = await fetch(
      `http://${ip}:${port}/api/report/get-predict-period-all`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();

    return response.ok
      ? { success: true, message: data.message, result: data.data }
      : {
          success: false,
          message: data.message || "Unknown error",
          result: data.data,
        };
  } catch (e) {
    return { success: false, message: "Network error. Please try again." + e };
  }
};

export const fetchGetPredictReportsWeekAll = async () => {
  try {
    const response = await fetch(
      `http://${ip}:${port}/api/report/get-predict-period-week-all`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();

    return response.ok
      ? { success: true, message: data.message, result: data.data }
      : {
          success: false,
          message: data.message || "Unknown error",
          result: data.data,
        };
  } catch (e) {
    return { success: false, message: "Network error. Please try again." + e };
  }
};
export const fetchGetPredictReportsWeek = async (equipment) => {
  try {
    const response = await fetch(
      `http://${ip}:${port}/api/report/get-predict-period-week`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ equipment: equipment }),
      },
    );
    const data = await response.json();

    return response.ok
      ? { success: true, message: data.message, result: data.data }
      : {
          success: false,
          message: data.message || "Unknown error",
          result: data.data,
        };
  } catch (e) {
    return { success: false, message: "Network error. Please try again." + e };
  }
};

export const fetchGetAnnualCost = async () => {
  try {
    const response = await fetch(
      `http://${ip}:${port}/api/report/get-annual-cost`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    return response.ok
      ? { success: true, message: data.message, result: data.data }
      : {
          success: false,
          message: data.message || "Unknown error",
          result: data.data,
        };
  } catch (e) {
    return {
      success: false,
      message: "Network error. Please try again." + e,
    };
  }
};

export const fetchGetReportsAll = async (period) => {
  try {
    const response = await fetch(
      `http://${ip}:${port}/api/report/get-period-all`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ period: period }),
      },
    );
    const data = await response.json();

    return response.ok
      ? { success: true, message: data.message, result: data.data }
      : {
          success: false,
          message: data.message || "Unknown error",
          result: data.data,
        };
  } catch (e) {
    return { success: false, message: "Network error. Please try again." + e };
  }
};
