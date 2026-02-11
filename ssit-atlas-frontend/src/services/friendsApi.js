import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const getAuthHeader = () => {
  const token = sessionStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Friend Requests
export const sendFriendRequest = async (receiverId) => {
  const response = await axios.post(
    `${API_BASE_URL}/friends/request`,
    { receiverId },
    { headers: getAuthHeader() }
  );
  return response.data;
};

export const getPendingRequests = async () => {
  const response = await axios.get(`${API_BASE_URL}/friends/requests`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const acceptFriendRequest = async (requestId) => {
  const response = await axios.post(
    `${API_BASE_URL}/friends/request/${requestId}/accept`,
    {},
    { headers: getAuthHeader() }
  );
  return response.data;
};

export const rejectFriendRequest = async (requestId) => {
  const response = await axios.post(
    `${API_BASE_URL}/friends/request/${requestId}/reject`,
    {},
    { headers: getAuthHeader() }
  );
  return response.data;
};

// Friends List
export const getFriendsList = async () => {
  const response = await axios.get(`${API_BASE_URL}/friends`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const removeFriend = async (friendId) => {
  const response = await axios.delete(`${API_BASE_URL}/friends/${friendId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const searchUsers = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/friends/search`, {
    params: { query },
    headers: getAuthHeader(),
  });
  return response.data;
};
