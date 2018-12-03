/**
 * 号源数据
 */
export interface Sources {
  id?: string;
  createTime?: any;
  updateTime?: any;
  status?: number;
  hospitalId?: string;
  doctorId?: string;
  date?: string;
  time?: string;
  total?: number;
  appointed?: number;
  grade?: number;
  hospitalName?: string;
  type?: string;
  phoneNumber?: string;
  address?: string;
}
export interface BlacklistData {
  id?: string;
  createTime?: any;
  updateTime?: any;
  status?: number;
  username?: any;
  defaultTimes?:number;
  verifyStatus?:string
}
/**
 * 医院信息数据
 */
export interface HospitalInfo {
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
/**
 * 违约记录
 */
export interface BreakContractRecords {
  id: string;
  createTime?: any;
  updateTime?: any;
  status: number;
  userId: string;
  verifyStatus?: string;
  defaultTimes?: string;
  date?: string;
  info?: string;
  type: number;
}