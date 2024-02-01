
const fetchLinks = async () => {
    try {
      const response = await fetch('https://thinrl.com:8080/all');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching links:', error);
      return null;
    }
  };
  
  export { fetchLinks };
  