import { apiConnector } from "../apiConnector";
const BASE_URL = 'https://payments-app-k3yl.onrender.com/api/v1';

export const getUsers = async (token, filter) => {
  try {
    const response = await apiConnector(
      "GET",
      `${BASE_URL}/user/bulk`,
      {},
      { Authorization: `Bearer ${token}` },
      { filter: filter }
    );

    return response.data;  // IMPORTANT
  } catch (error) {
    console.log("Getusers error...", error.message);
    return { user: [] };
  }
};

export const getCurrentUser = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      `${BASE_URL}/user/getCurrentUser`,
      {},
      { Authorization: `Bearer ${token}` }
    );

    return response.data.currentUser;
  } catch (error) {
    console.log("get user error...", error.message);
  }
};

export const updateCredentials = async (token, updatedData) => {
  try {
    const response = await apiConnector(
      "PUT",
      `${BASE_URL}/user/`,
      updatedData,
      { Authorization: `Bearer ${token}` }
    );

    return response.data.message;
  } catch (error) {
    console.log("Update credentials error...", error.message);
  }
};

