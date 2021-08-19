const Axios = require("axios");

const instance = Axios.create({
  baseURL: "http://localhost:3001/api/",
});

const get_restaurants = async () => {
  try {
    const result = await instance.get("/restaurants");
    return result.data.data;
  } catch (error) {
    return error;
  }
};

const delete_restaurant = async (id) => {
  try {
    return await instance.delete(`/restaurants?id=${id}`);
  } catch (error) {
    return error;
  }
};
const new_restaurant = async (data) => {
  try {
    return await instance.post(`/restaurants`, data);
  } catch (error) {
    return error;
  }
};

const update_restaurant = async (data, id) => {
  try {
    return await instance.patch(`/restaurants?id=${data.id}`, data);
  } catch (error) {
    return error;
  }
};

const get_booking = async () => {
  try {
    const result = await instance.get("/booking");
    return result.data.data;
  } catch (error) {
    return error;
  }
};

const new_booking = async (data) => {
  try {
    return await instance.post(`/booking?id=${data.restaurant}`, data);
  } catch (error) {
    return error;
  }
};
export {
  instance,
  get_restaurants,
  delete_restaurant,
  new_restaurant,
  get_booking,
  new_booking,
  update_restaurant,
};
