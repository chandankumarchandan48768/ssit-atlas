import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const getAuthHeader = () => {
    const token = sessionStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getChatHistory = async (friendId, page = 0, size = 50) => {
    const response = await axios.get(
        `${API_BASE_URL}/chat/${friendId}/history`,
        {
            params: { page, size },
            headers: getAuthHeader(),
        }
    );
    return response.data;
};

export const markMessagesAsRead = async (friendId) => {
    const response = await axios.post(
        `${API_BASE_URL}/chat/${friendId}/read`,
        {},
        { headers: getAuthHeader() }
    );
    return response.data;
};

export const getUnreadCount = async () => {
    const response = await axios.get(`${API_BASE_URL}/chat/unread`, {
        headers: getAuthHeader(),
    });
    return response.data;
};
