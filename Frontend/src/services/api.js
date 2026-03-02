import axios from 'axios';

export const fetchArticles = async (query) => {
  const response = await axios.get(`/api/articles?search=${query}`);
  return response.data;
};
