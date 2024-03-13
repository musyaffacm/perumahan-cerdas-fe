const API_URL = "http://127.0.0.1:8000/api";
const BASE_BE_URL = "http://127.0.0.1:8000";

const createMonth = (id, label) => {
  return { id, label };
};

const STATIC_MONTH = [
  createMonth(1, "Januari"),
  createMonth(2, "Febuari"),
  createMonth(3, "Maret"),
  createMonth(4, "April"),
  createMonth(5, "Mei"),
  createMonth(6, "Juni"),
  createMonth(7, "Juli"),
  createMonth(8, "Agustus"),
  createMonth(9, "September"),
  createMonth(10, "Oktober"),
  createMonth(11, "November"),
  createMonth(12, "Desember"),
];

export { API_URL, BASE_BE_URL, STATIC_MONTH };
