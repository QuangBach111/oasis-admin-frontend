import { clientAxios } from "./clientAxios";


export async function getSettings() {
  const { data } = await clientAxios.get("/settings");
  return data;
}

export async function editSettings(settingToEdit) {
  console.log('settingToEdit', settingToEdit);

  const { data } = await clientAxios.put("/settings", settingToEdit);
  return data;
}