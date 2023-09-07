import { clientAxios } from "./clientAxios";

export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  console.log('token', token);
  if (!token) return null;

  try {
    const { data } = await clientAxios.get("/users/currentUser");
    console.log("get current user");
    console.log('data', data);

    return data;
  } catch (error) {
    throw new Error("Expired Login!");
  }

}