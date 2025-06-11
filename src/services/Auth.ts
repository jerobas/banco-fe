import Cookies from "js-cookie";
import ApiService from "../api/index";
import { IPlayerDefaultsWithRoom } from "../interfaces";

const KEY = import.meta.env.VITE_KEY_NAME || "lopoly-token";

export const isAlreadyAuthenticated = async () => {
  try {
    const token = Cookies.get(KEY);
    if (!token) {
      deleteUserFromStorage();
      return false;
    }
    const data = await ApiService.get("/users/me");
    return !!data;
  } catch (error) {
    deleteUserFromStorage();
    return false;
  }
};

export const removeUserFromLastRoom = async () => {
  let user = JSON.parse(localStorage.getItem(KEY) || JSON.stringify(null));
  let { data } = await ApiService.get<IPlayerDefaultsWithRoom>(
    `/users/${user.id}`
  );
  if (data.room) {
    let reponse = await ApiService.post(`/rooms/leave`, {
      roomId: data.room.id,
    });
    if (reponse.status == 200) {
      await isAlreadyAuthenticated();
    }
  }
};

export const saveUserInStorage = (user) => {
  localStorage.setItem(KEY, user);
};

export const getUserFromLocalStorage = () => {
  return localStorage.getItem(KEY);
};

export const deleteUserFromStorage = () => {
  localStorage.removeItem(KEY);
};
