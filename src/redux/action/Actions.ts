import {
    LOGIN,
    LOGOUT
    } from "../ActionTypes";
import { createAction } from "redux-actions";
import {getUserData} from "../../_util/auth";

export const login = createAction(LOGIN,()=>{
    return getUserData()
});
export const logout = createAction(LOGOUT);