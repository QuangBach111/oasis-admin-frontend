import { clientAxios } from "./clientAxios";

export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const { data } = await clientAxios.get("/users/currentUser");

    return data;
  } catch (error) {
    throw new Error("Expired Login!");
  }

}