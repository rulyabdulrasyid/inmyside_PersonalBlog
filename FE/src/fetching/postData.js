import { baseUrl } from "./fetchData";

// LOGIN
export async function postLoginData(username, password) {
  const response = await fetch(`${baseUrl}/users/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status:${response.status}`);
  }
  const data = await response.json();
  return data;
}

// CREATE CONTENT
export async function postContent(
  title,
  text,
  publication,
  published_at,
  image,
  category_id,
  accessToken
) {
  // console.log(category_id);
  const response = await fetch(`${baseUrl}/content/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title,
      text,
      publication,
      published_at,
      image,
      category_id,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  // console.log(data);
  return data;
}
