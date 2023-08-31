import { clientAxios } from "./clientAxios";

export async function getCabins() {
  const { data, error } = await clientAxios.get("/cabins");

  if (error) {
    throw new Error("Cabins could not be loaded!");
  }

  return data;
}

export async function deleteCabin(cabinId) {
  const { data, error } = await clientAxios.delete(`/cabins/${cabinId}`);
  if (error) {
    throw new Error("Cabins could not be deleted!");
  }

  return data;
}
export async function createCabin(newCabin) {
  console.log('newCabin', newCabin);

  const { data } = await clientAxios.post(
    "/cabins", newCabin
  );
  return data;
}

export async function editCabin(newCabin) {
  const { data } = await clientAxios.put(
    "/cabins", newCabin
  );
  return data;
}