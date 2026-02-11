import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const getAuthHeader = () => {
    const token = sessionStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};
};

export const getOwnProfile = async () => {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: getAuthHeader(),
    });
    return response.data;
};

export const getUserProfile = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/profile/${userId}`, {
        headers: getAuthHeader(),
    });
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await axios.put(`${API_BASE_URL}/profile`, profileData, {
        headers: getAuthHeader(),
    });
    return response.data;
};

export const uploadProfilePhoto = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_BASE_URL}/profile/photo`, formData, {
        headers: {
            ...getAuthHeader(),
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteProfilePhoto = async () => {
    const response = await axios.delete(`${API_BASE_URL}/profile/photo`, {
        headers: getAuthHeader(),
    });
    return response.data;
};
