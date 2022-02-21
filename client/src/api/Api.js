import axios from "axios";

/************************DB connection**********************************/
let url;

if (process.env.NODE_ENV === "production") {
  // url = "api";
  url = "https://restaurant-ord.herokuapp.com/api";
}
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:9000/api";
}

export const api = axios.create({
  baseURL: url,
});
/************************Orders*****************************************/
export const getOrders = async () => {
  try {
    let { data } = await api.get("/orders");
    console.log("data", data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const getNewOrders = async () => {
  try {
    let { data } = await api.get("/orders/new");
    console.log("data", data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const getOrdersHistory = async () => {
  try {
    let { data } = await api.get("/orders/done");
    console.log("data", data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const updateOrderStatus = async (id) => {
  try {
    const { data } = await api.put(`/orders/done/${id}`);
    return data;
  } catch (e) {
    console.log(e.message);
    console.dir(e);
  }
};

export const deleteOrder = async (id) => {
  try {
    let { data } = await api.delete(`/orders/${id}`);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
/************************Meals******************************************/
export const getMeals = async () => {
  try {
    let { data } = await api.get("/meals");
    console.log("data", data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const getMeal = async (id) => {
  try {
    let { data } = await api.get(`/meals/${id}`);
    console.log("data", data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const addMeal = async (obj) => {
  try {
    let { data } = await api.post(`/meals`, obj);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const updateMeal = async (id, obj) => {
  try {
    const { data } = await api.put(`/meals/${id}`, obj);
    return data;
  } catch (e) {
    console.log(e.message);
    console.dir(e);
  }
};

export const deleteMeal = async (id) => {
  try {
    let { data } = await api.delete(`/meals/${id}`);
    console.log("data from delete", data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
/************************Users Authentication***************************/
export const getUserByToken = async (token) => {
  try {
    let { data } = await api.get(`/users/${token}`);
    console.log("data", data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const login = async (email, password) => {
  console.log("from login", email, password);
  try {
    const data = await api.post(`/users/login`, { email, password });
    // const { data } = await api.post(`/users/login`, { email, password });
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const logout = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    //logout failed
  }
  try {
    const { data } = await api.post(
      `/users/logout`,
      {},
      {
        headers: { Authorisation: `Bearer ${token}` },
      }
    );
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
/************************Users******************************************/
export const getUsers = async () => {
  try {
    let { data } = await api.get("/users");
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
export const getUser = async (id) => {
  try {
    const { data } = await api.get(`/users/${id}`);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
export const updateUser = async (id, obj) => {
  try {
    const { data } = await api.put(`/users/${id}`, obj);
    return data;
  } catch (e) {
    console.log(e.message);
    console.dir(e);
  }
};
export const creatUser = async (obj) => {
  try {
    let { data } = await api.post(`/users`, obj);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
export const deleteUser = async (id) => {
  try {
    let { data } = await api.delete(`/users/${id}`);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
