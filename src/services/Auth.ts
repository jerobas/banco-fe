import ApiService from '../api/index';
import { IPlayerDefaultsWithRoom } from '../interfaces';

export const TOKEN_KEY_USER = "@bi-user";

export const isAlreadyAuthenticated = async () => {
  try {
    const data = await ApiService.get("/users/me");
    return !!data;
  } catch (error) {
    deleteUserFromStorage();
    return false;
  }
};

export const removeUserFromLastRoom = async () => {
  let user = JSON.parse(
    localStorage.getItem(TOKEN_KEY_USER) || JSON.stringify(null)
  );
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
  localStorage.setItem(TOKEN_KEY_USER, user);
};

export const getUserFromLocalStorage = () => {
  return localStorage.getItem(TOKEN_KEY_USER);
};

export const deleteUserFromStorage = () => {
  localStorage.removeItem(TOKEN_KEY_USER);
};
