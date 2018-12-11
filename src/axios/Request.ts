import service from "./Service";
import { RestPage } from "../type/CommonData";
import { BlacklistData, Sources } from "../type/SourcesData";
import {PushList, OneList, News, FilterArr, verifyOneList} from "../type/MessageData";


// 获取日志列表
export function getLogList() {
  // return service.get("");
  const data = [];
  for (let i = 0; i <100; i++) {
    data.push({
      id: 1,
      username: "康若曼",
      date: "2018/11/21"
    });
  }
  return data;
}

/** 医院字典 */
export function getHosDic(params:any) {
  return service.get("/portalHospitals/keywords",{params});
}
/** 新增一条医院信息 */
export function postHosForm(data:any) {
    return service.post(`/portalHospitals`,data);
}
/** 医院新增和详情页面,获取一个医院的信息 */
export function getOneHos(id:any) {
    return service.get(`/portalHospitals/${id}`);
}
/** 修改保存医生信息 */
export function updateHos(data:any,id:any) {
    return service.patch(`/portalHospitals/${id}`,data);
}

/** ******************************************************** */

/** 医生字典 */
export function getDocDic(params:any) {
  return service.get("/portalDoctors/keywords",{params});
}
/** 医生新增和详情页面,获取一个医生的信息 */
export function getOneDoc(id:any) {
    return service.get(`/portalDoctors/${id}`);
}
/** 新增一条医生信息 */
export function postForm(data:any) {
    return service.post(`/portalDoctors`,data);
}
/** 修改保存医生信息 */
export function updateDoc(data:any,id:any) {
    return service.patch(`/portalDoctors/${id}`,data);
}
/**
 * 获取号源
 */
export function getSources(params: any) {
  return service.get<RestPage<Sources>>("/sources/query", { params });
}
/**
 * 获取黑名单列表
 */
export function getBlacklist(params: any) {
  return service.get<RestPage<BlacklistData>>("/blackLists/query", {
    params
  });
}
/*
 *
 * 获取推送列表*/
export function getInfoPushList() {
  return service.get<RestPage<PushList>>("/news");
}
/*
*
* 获取一条推送列表*/
export function getInfoOneList(id:any) {
    return service.get<OneList>(`/news/${id}`,{
      headers:{
        "Cache-Control":"no-cache"
      }
    })
}
// 新增一条推送
export function addNews(data:News) {
    return service.post("/news",data)
}
// 编辑一条推送
export function editNews(data:News,id:any) {
  return service.patch(`/news/${id}`,data)
}
// 删除一条推送
export function delateNew(id:string) {
  return service.delete(`/news/${id}`)
}
// 点击查询时根据筛选条件返回数据
export function filterQuery(params:FilterArr) {
    return service.get("/news/keywords",{params})
}
// 查询认证列表
export function getVerify() {
    return service.get("/verifies")
}

// 获取首页统计数据
export function getHomeStatics() {
    return service.get("/statistics/homepage")
}

// 获取一条认证信息

export function getOneVerify(id:string) {
    return service.get(`/verifies/${id}`)
}

// 数据进入审核
    export function patchOneVerify(param:verifyOneList,id:any) {
    return service.patch(`/verifies/${param.id}`,param)
}
