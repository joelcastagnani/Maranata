const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const fetchItems = async () => {
  const response = await fetch(`${API_BASE_URL}/items`);
  return await response.json();
};
