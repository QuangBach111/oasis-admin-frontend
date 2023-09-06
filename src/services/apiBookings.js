// import { getToday } from "../utils/helpers";
import { clientAxios } from "./clientAxios";


export async function getBookings({ filter, sortBy }) {
  const requestParams = {};
  if (filter) {
    requestParams.filter_field = filter.field;
    requestParams.filter_value = filter.value;
  }

  if (sortBy) {
    requestParams.sortBy_field = sortBy.field;
    requestParams.sortBy_direction = sortBy.direction;
  }
  try {
    const { data } = await clientAxios.get("/bookings", {
      params: requestParams
    });

    return { data };
  } catch (error) {
    throw new Error("Somethings wrong with server! Can not get booking list");
  }
}

export async function getBooking(id) {
  try {
    const { data } = await clientAxios.get(`/bookings/${id}`);

    return data;
  } catch (error) {
    throw new Error(`Something wrong!`);
  }
}

export async function updateBooking(booking) {

  const { data, error } = await clientAxios.put("/bookings", booking);

  if (error) {
    throw new Error("Update is failed!");
  }

  return data;

}

export async function deleteBookingApi(bookingId) {
  try {
    const { data } = await clientAxios.delete(`/bookings/${bookingId}`);

    return data;
  } catch (error) {
    throw new Error("Delete is failed!");
  }
}
