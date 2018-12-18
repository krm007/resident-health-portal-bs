import {
    LOGIN,
    LOGOUT
    } from "../ActionTypes";
import { createAction } from "redux-actions";

export const login = createAction(LOGIN,()=>{
    return LOGIN
});
export const logout = createAction(LOGOUT);