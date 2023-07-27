import axios from "axios";
import { API_URL } from "./config";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FuZGVlcCBTb2tsZSIsImVtYWlsIjoic2FuZGVlcHNva2xlMTJAZ21haWwuY29tIiwicGhvbmUiOjk3Mjk5MjgzODcsIl9pZCI6IjY0YWMyMjEzNTUwYWYwNGVjMzFmY2I3YyIsImlhdCI6MTY4OTA3Mzc4NH0.GxijRwcHEmgVzNRR_itPyuScy0iYZuzL5YSHRUn91sw";

export const add_Record_API = async (data) => {
  const { spendBy, spendFor, amount, dateValue } = data;
  try {
    let data = await axios.post(
      `${API_URL}transaction/add_record`,
      {
        spendBy,
        spendFor,
        amount,
        date: dateValue,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    return null;
  }
};

export const get_Records = async () => {
  try {
    let data = await axios.get(
      `${API_URL}transaction/get_record?user=64ac2213550af04ec31fcb7c`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    return null;
  }
};

export const edit_Record_API = async (data) => {
  const { spendBy, spendFor, amount, dateValue, _id } = data;

  console.log({
    spendBy,
    spendFor,
    amount,
    dateValue,
    _id,
  });
  try {
    let data = await axios.post(
      `${API_URL}transaction/edit_record`,
      {
        spendBy,
        spendFor,
        amount,
        date: dateValue,
        _id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    return null;
  }
};

export const get_Records_monthly = async () => {
  try {
    let data = await axios.get(
      `${API_URL}transaction/get_record/monthly?user=64ac2213550af04ec31fcb7c`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log({ data });
    return data.data;
  } catch (error) {
    return null;
  }
};

export const get_Records_yearly = async () => {
  try {
    let data = await axios.get(
      `${API_URL}transaction/get_record/yearly?user=64ac2213550af04ec31fcb7c`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log({ data });
    return data.data;
  } catch (error) {
    return null;
  }
};
