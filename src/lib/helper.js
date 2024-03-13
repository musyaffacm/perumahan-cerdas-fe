export const httpErrorHandler = (error, toArray = false) => {
  let errorsMessage = {};
  let errorsMessageArray = [];

  if (error.response) {
    errorsMessage = error.response.data.errors;
  } else {
    if (error.code === "ERR_NETWORK") {
      errorsMessage = {
        general: "Terjadi masalah koneksi, pastikan koneksi anda stabil",
      };
    } else if (error.code === "ERR_CANCELED") {
      errorsMessage = { general: "Koneksi dibatalkan" };
    } else {
      errorsMessage = { general: error.message };
    }
  }

  const listErr = Object.values(errorsMessage);
  errorsMessageArray = listErr.map((item) =>
    Array.isArray(item) ? item[0] : item
  );

  return toArray ? errorsMessageArray : errorsMessage;
};

export const formatHouseId = (houseId) => {
  return "RC-" + String(houseId).padStart(4, "0");
};

export const formatDate = (date, month = "long") => {
  if (!date) {
    return "-";
  }
  return new Date(date).toLocaleDateString("id-id", {
    year: "numeric",
    month: month,
    day: "numeric",
  });
};
