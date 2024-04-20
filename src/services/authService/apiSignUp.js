import { LOCALHOST_AUTH } from "../constant";

const prefixUrl = LOCALHOST_AUTH + "/signup";

export async function signUp(request) {
  console.log("SIGNUP DATA1", request);
  const response = await fetch(`${prefixUrl}`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("SIGNUP DATA2", response);

  if (!response.ok) {
    throw new Error("Failed to sign up");
  }

  localStorage.setItem("login", request.login);
  localStorage.setItem("fio", request.fio);

  let data = await response.json();
  data = {
    user: { jwt: data.jwt, refresh: data.refresh, userid: data.userid },
  };
  console.log("SIGNUP DATA3", data);
  localStorage.setItem("accessToken", data.user.jwt);
  localStorage.setItem("refreshToken", data.user.refresh);
  localStorage.setItem("userId", data.user.userid);

  return { data };
}
