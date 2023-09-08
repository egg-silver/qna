import axios from 'axios';

axios.defaults.baseURL = 'https://vercel-express-pied-kappa.vercel.app';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const api = axios.create({ timeout: 5000 });

// 데이터를 가져오는 함수
export const fetchComplaints = async (page) => {
  try {
    const response = await api.get(`/qna?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching complaints:', error);
    throw error;
  }
};

// 디테일 페이지의 데이터를 가져오는 함수
export const fetchComplaintDetail = async (id) => {
  try {
    const response = await api.get(`/qna/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching complaint detail:', error);
    throw error;
  }
};

export const updateComplaintAnswer = async (id, answer) => {
  try {
    const response = await api.patch('/qna', { id, answer });
    return response.data;
  } catch (error) {
    console.error('Error updating complaint answer:', error);
    throw error;
  }
};