import io from 'socket.io-client'

export const socket = io(import.meta.env.VITE_SOCKET_API_AWS)
export const TOKEN_KEY_USER = '@bi-user'
export const isAlreadyAuthenticated = () => localStorage.getItem(TOKEN_KEY_USER) !== null

export const saveUserInStorage = (user) => {
    localStorage.setItem(TOKEN_KEY_USER, user)
}

export const getUserFromLocalStorage = () => {
    return localStorage.getItem(TOKEN_KEY_USER)
}