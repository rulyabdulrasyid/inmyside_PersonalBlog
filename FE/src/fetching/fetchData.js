export const baseUrl = "http://localhost:3001";

export const fetchData = async (url) => {
  const response = await fetch(`${baseUrl}/${url}`, { method: "GET" });
  const data = await response.json();
  return data;
};

export const fetchUser = async () => {
  const data = await fetchData("user");
  return data;
};

export const fetchContent = async () => {
  const data = await fetchData("content");
  return data;
};

export const fetchCategory = async () => {
  const data = await fetchData("category");
  return data;
};
