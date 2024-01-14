import axios from 'axios';

const apiUrl = 'http://localhost:8080/api';

const fetchLinks = async () => {
  try {
    const response = await axios.get(`${apiUrl}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching links:', error);
    return null;
  }
};
  
const generateShortUrl = async (longUrl: string) => {

  try {
    const response = await axios.post(`${apiUrl}/generate`, { longUrl });
    return response.data;
  } catch (error) {
    console.error('Error generating short URL:', error);
    return null;
  }
};

  export { fetchLinks, generateShortUrl };
  