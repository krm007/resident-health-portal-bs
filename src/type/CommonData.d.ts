// 登录日志列表
export interface LogList {
    id?:number,
    username?:string,
    date?:string
}

// 医院字典
export interface HosDic {
    key?:string,
    name?: string,
    level?:string,
    type?:string,
    address?:string,
    tel?:string,
}

// 医生字典
export interface DocDic {
    key?:string,
    name?: string,
    level?:string,
    hospital?:string,
    address?:string,
}