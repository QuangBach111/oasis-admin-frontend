import { clientAxios } from "./clientAxios";

export async function doLogin({ email, password }) {
  try {
    const { data } = await clientAxios.post("/auth/login", { email, password });
    return data;
  } catch (error) {
    throw new Error("Email or password is not corrected!");
  }
}

export async function doLogout() {
  try {
    const { data } = await clientAxios.get("/auth/logout");
    return data;
  } catch (error) {
    throw new Error("Email or password is not corrected!");
  }
}

export async function doRegister(register) {
  console.log('register', register);
  try {
    const { data } = await clientAxios.post("/auth/register", register);

    return data;
  } catch (error) {
    throw new Error("Email is already exists!");
  }
}