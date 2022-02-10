import axios from "axios";

let url;

if (process.env.NODE_ENV === "production") {
  url = "api";
}
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:9000/api";
}

export const api = axios.create({
  baseURL: url,
});
export const getUserByToken = async (token) => {
  try {
    let { data } = await api.get(`/users/${token}`);
    console.log("data", data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
export const getOrders = async () => {
  try {
    let { data } = await api.get("/v1/orders");
    console.log("data", data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
// router.post("/users", signup);

// router.post("/users/logout", auth, logout);
// router.post("/users/logoutAll", auth, logoutAll);
// router.get("/users/me", auth, myProfile);
// router.patch("/users/me", auth, updateMyProfile);
// router.delete("/users/me", auth, deleteMyProfile);

//get back data object ,insiside there is token so res.data.token
// setUser(res.data);
// setToken(res.data.token);
// setLoggedUser(res.data);
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

//-------------------------------------------------------
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
