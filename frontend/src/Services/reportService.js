const ip = import.meta.env.MY_IP || "localhost";
const port = import.meta.env.PORT || 5000;

export const fetchGetReports = async (body) => {
  try {
    const response = await fetch(`http://${ip}:${port}/api/report/get-day`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ day: body }),
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
