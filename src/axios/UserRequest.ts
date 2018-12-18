import service from "./Service";
import * as qs from "qs";

/**
 * 登录接口
 */
export function logIn(param: any) {
    return service.post("/login/loginByPhonePwd", qs.stringify(param));
}