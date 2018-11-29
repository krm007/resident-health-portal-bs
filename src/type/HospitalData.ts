// 登录日志列表


export interface LogList {
  id?:number,
  username?:string,
  date?:string
}

/** 医院字典 */
export interface HosDic {
    avatarUrl?: string;
    category?: string;
    code?: string;
    id?: string;
    introduction?: string;
    level?: string;
    location?: string;
    max?: number;
    name?: string;
    outpatient?: object;
    parkingLot?: number;
    phone?: string;
    stars?: string;
    top?: string[];
}

/** 医生字典 */
export interface DocDic {
    avatarUrl?: string;
    depart?: string;
    departId?: string;
    detail?: string;
    experts?: string[];
    hospitalId?: string;
    hospitalName?: string;
    id?: string;
    introduction?: string;
    level?: string;
    major?: string;
    name?: string;
    schedules?: Schedule[];
    skillful?: string;
    title?: string;
}
/**
 * 排班列表项
 */
export interface Schedule {
    date?: string;
    id?: string;
    time?: string;
}