import { passwordChange } from "./authService/apiPasswordChange";
import { editNickname } from "./userService/apiProfile";
import { getUserByLogin } from "./userService/apiUsers";

export async function getCurrentUser() {
  let session;
  const token = localStorage.getItem("accessToken");
  if (token /* && token !== "undefined" */) {
    session = { accessToken: token };
  } else {
    session = null;
  }

  if (!session) {
    console.log("NO SESSION");
    return null;
  }
  const login = localStorage.getItem("login");
  let data = await getUserByLogin(login);
  console.log("SEARCHDATA", data);
  data = {
    user: {
      id: data.id,
      login: data.login,
      fio: data.fio,
      role: "authenticated",
    },
  };

  return data.user;
}

export async function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("fio");
  localStorage.removeItem("login");
}

export async function updateCurrentUser({ password, nickname }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (nickname) updateData = { data: { nickname } };
  let updateUser;

  if (password) {
    const request = {
      email: localStorage.getItem("email"),
      emailCode: "ajsd",
      newPassword: password,
    };
    const data = passwordChange(request);
    console.log("PASSWORD CHANGE", data);
    updateUser = {
      nickname: nickname,
    };
  }
  const data = await editNickname(localStorage.getItem("userId"), nickname);
  console.log("EDITNICKNAME", data);
  return updateUser;
}

// export async function updateCurrentUser({ password, nickname, avatar }) {
//   // 1. Update password OR fullName

//   let updateData;
//   if (password) updateData = { password };
//   if (nickname) updateData = { data: { nickname } };

//   const { data, error } = await supabase.auth.updateUser(updateData);

//   if (error) throw new Error(error.message);
//   if (!avatar) return data;

//   // 2.Upload avatar image
//   const fileName = `avatar-${data.user.id}-${Math.random()}`;

//   const { error: storageError } = await supabase.storage
//     .from("avatars")
//     .upload(fileName, avatar);

//   if (storageError) throw new Error(storageError.message);

//   // 3. Update avatar in the user
//   const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
//     data: {
//       avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
//     },
//   });

//   if (error2) throw new Error(error2.message);
//   return updatedUser;
// }
