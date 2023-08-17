import { baseUrl } from "./fetchData";

const fetchDataById = async (url, id) => {
  const response = await fetch(`${baseUrl}/${url}/${id}`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const fetchContentById = async (id) => {
  const data = await fetchDataById("content", id);
  return data;
};

export const fetchCategoryById = async (id) => {
  const data = await fetchDataById("category", id);
  return data;
};

export const fetchUserById = async (id) => {
  const data = await fetchDataById("user", id);
  return data;
};
