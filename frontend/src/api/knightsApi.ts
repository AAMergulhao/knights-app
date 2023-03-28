import axios from 'axios';

const knightApi = axios.create({
  baseURL: 'http://localhost:8500/api/knights', //TODO switch to env var
})

knightApi.interceptors.response.use((response) => response, (error) => {
  const { message } = error.response.data;
  alert(message);
});

export { knightApi };