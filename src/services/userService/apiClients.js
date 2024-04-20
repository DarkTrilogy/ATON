import { LOCALHOST_CLIENT } from "../constant";

const prefixUrl = LOCALHOST_CLIENT;

export async function addClientToUser(login, userChangeRequest) {
  userChangeRequest = {
    login,
    client: { ...userChangeRequest },
  };

  console.log("changeUser1", userChangeRequest);
  const response = await fetch(`${prefixUrl}/add?login=${login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userChangeRequest),
  });
  console.log("afgsghhdj", JSON.stringify(userChangeRequest));

  const data = await response.json();
  console.log("changeUser2", data);
  return data;
}

export async function deleteClientFromUser(login, id) {
  const response = await fetch(`${prefixUrl}/delete?login=${login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: id,
  });

  const data = await response.json();
  console.log("deleteUser2", data);
  return data;
}

export async function getClientById(id) {
  const response = await fetch(`${prefixUrl}?clientId=${id}`);
  const data = await response.json();
  console.log("getClientById", data);
  return data;
}
