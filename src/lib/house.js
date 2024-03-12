import axios from "axios";
import { API_URL } from "../constant/global";
import { httpErrorHandler } from "./helper";

export const addHouse = async (onSuccess = () => {}) => {
  const data = { error: {} };

  await axios
    .post(`${API_URL}/house`)
    .then((res) => {
      if (res.data && res.data.status === "success") {
        data.error = [];
        onSuccess();
      }
      if (res.data && res.data.status === "failed") {
        data.error = [res.data.message];
      }
    })
    .catch((err) => {
      data.error = httpErrorHandler(err, true);
    });

  return data;
};

export const updateHouse = async (
  residentId,
  formData,
  onSuccess = () => {}
) => {
  const data = { error: {} };

  await axios
    .post(`${API_URL}/resident/${residentId}?_method=PUT`, formData, {})
    .then((res) => {
      if (res.data && res.data.status === "success") {
        data.error = [];
        onSuccess();
      }
      if (res.data && res.data.status === "failed") {
        data.error = [res.data.message];
      }
    })
    .catch((err) => {
      data.error = httpErrorHandler(err, true);
    });

  return data;
};
