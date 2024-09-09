import { Session } from "../interfaces/session.interface";

// storage.ts
const TOKEN_KEY = 'authToken';
const ROLE_KEY = 'authRole';
const USERID_KEY = 'authUserId';
const FULLNAME_KEY = 'authFullName';

// Token
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

// Role
export const getRole = () => localStorage.getItem(ROLE_KEY);
export const setRole = (role: string) => localStorage.setItem(ROLE_KEY, role);
export const removeRole = () => localStorage.removeItem(ROLE_KEY);

// UserId
export const getUserId = () => localStorage.getItem(USERID_KEY);
export const setUserId = (userId: string) => localStorage.setItem(USERID_KEY, userId);
export const removeUserId = () => localStorage.removeItem(USERID_KEY);

// FullName
export const getFullName = () => localStorage.getItem(FULLNAME_KEY);
export const setFullName = (fullName: string) => localStorage.setItem(FULLNAME_KEY, fullName);
export const removeFullName = () => localStorage.removeItem(FULLNAME_KEY);

export const addSession = (session: Session ) => {
    setToken(session.token);
    setToken(session.role);
    setUserId(session.userId);
    setFullName(session.fullName);
}

export const removeSession = () => {
    removeToken();
    removeRole();
    removeUserId();
    removeFullName();
}
