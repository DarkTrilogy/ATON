import { LOCALHOST_USER } from "../constant";

const prefixUrl = LOCALHOST_USER;

export async function getUserByLogin(login) {
  const url = `${prefixUrl}?login=${login}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
