// import { getToday } from "../utils/helpers";
import { getToday } from "../utils/helpers";
import { clientAxios } from "./clientAxios";


export async function getBookings({ filter, sortBy, pageNo }) {
  const requestParams = {};
  if (filter) {
    requestParams.filter_field = filter.field;
    requestParams.filter_value = filter.value;
  }

  if (sortBy) {
    requestParams.sortBy_field = sortBy.field;
    requestParams.sortBy_direction = sortBy.direction;
  }

  requestParams.pageNo = pageNo ? pageNo : 1;

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

export async function getBookingsAfterDate(date) {
  try {
    const { data } = await clientAxios.get("/bookings/date", {
      params: {
        date: date,
        currentDate: getToday()
      }
    });
    return data;

  } catch (error) {
    throw new Error("Something wrong!");
  }
}

export async function getStayAfterDate(date) {
  console.log('date', date);

  try {
    const { data } = await clientAxios.get("/bookings/stay", {
      params: {
        date: date,
        currentDate: getToday({ end: true })
      }
    });
    return data;

  } catch (error) {
    throw new Error("Something wrong!");
  }
}