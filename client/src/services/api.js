import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

export const analyzeResume = async (file, targetRole) => {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('targetRole', targetRole);

    const response = await axios.post(`${API_BASE_URL}/resume/analyze`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
