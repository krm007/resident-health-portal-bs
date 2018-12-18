import { userData } from "../type/UserInfoData";
export const login =(phone:string,userdata: userData) => {
    window.localStorage.setItem("phone",phone);
    window.localStorage.setItem("userData",JSON.stringify(userdata))
};
export const logOut = () => {
    window.localStorage.removeItem("phone");
};
export function getUserData():userData {
    let userdata: userData = {};
    const dataString = window.localStorage.getItem("userData");
    if(dataString !== null){
        userdata = JSON.parse(dataString);
    }
    return userdata
}
