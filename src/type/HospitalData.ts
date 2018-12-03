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


