import io from "socket.io-client";
import ApiService from "../api/index";

export const socket = io(import.meta.env.VITE_SOCKET_API_AWS);
export const TOKEN_KEY_USER = "@bi-user";

export const isAlreadyAuthenticated = async () => {
  try {
    let user = JSON.parse(localStorage.getItem(TOKEN_KEY_USER));
    if (!user) return false;

    let { data } = await ApiService.get(`/users/${user.id}`);
    return !!data;
  } catch (error) {
    return false;
  }
};

export const removeUserFromLastRoom = async () => {
  let user = JSON.parse(localStorage.getItem(TOKEN_KEY_USER));
  let { data } = await ApiService.get(`/users/${user.id}`);
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
  localStorage.setItem(TOKEN_KEY_USER, user);
};

export const getUserFromLocalStorage = () => {
  return localStorage.getItem(TOKEN_KEY_USER);
};
