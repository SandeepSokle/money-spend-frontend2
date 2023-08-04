import axios from "axios";
import { API_URL } from "./config";
import { increment } from "../../redux/user/action";

export const add_Record_API = async (data) => {
  const { spendBy, spendFor, amount, dateValue } = data;
  const token = window.localStorage.getItem("moneySpendsToken");
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

export const get_Records = async ({ userData }) => {
  const token = window.localStorage.getItem("moneySpendsToken");
  try {
    let data = await axios.get(
      `${API_URL}transaction/get_record?user=${userData._id}`,
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
  const token = window.localStorage.getItem("moneySpendsToken");
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

export const get_Records_monthly = async ({ userData }) => {
  const token = window.localStorage.getItem("moneySpendsToken");
  try {
    let data = await axios.get(
      `${API_URL}transaction/get_record/monthly?user=${userData._id}`,
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

export const get_Records_yearly = async ({ userData }) => {
  const token = window.localStorage.getItem("moneySpendsToken");
  try {
    let data = await axios.get(
      `${API_URL}transaction/get_record/yearly?user=${userData}`,
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

export const user_login = async ({ email, password, dispatch }) => {
  try {
    let user = await axios.post(`${API_URL}user/login`, {
      email,
      password,
    });
    window.localStorage.setItem("moneySpendsToken", user.data.token);
    return true;
  } catch (error) {
    return false;
  }
};

export const user_signUp = async ({ userDetail }) => {
  try {
    let user = await axios.post(`${API_URL}user/signup`, {
      ...userDetail,
    });
    window.localStorage.setItem("moneySpendsToken", user.data.token);
    return true;
  } catch (error) {
    return false;
  }
};

export const get_user_detail = async ({ dispatch }) => {
  const token = window.localStorage.getItem("moneySpendsToken");
  try {
    if (token) {
      let user = await axios.get(`${API_URL}user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(
        increment({
          data: {
            ...user.data.user,
          },
        })
      );
      return user.data;
    }
  } catch (error) {
    return 0;
  }
};

export const get_activity_logs = async ({ userData }) => {
  const token = window.localStorage.getItem("moneySpendsToken");
  try {
    let data = await axios.get(
      `${API_URL}transaction/get_activity_logs?user=${userData._id}`,
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