import service from "./Service";
import { RestPage ,DicLib} from "../type/CommonData";
import { BlacklistData, Sources } from "../type/SourcesData";
import {DocDic,OneDoc} from "../type/DoctorData";
import {HosDic} from "../type/HospitalData";
import {PushList, OneList, News,  FilterArr} from "../type/MessageData";

// 获取日志列表
export function getLogList() {
  // return service.get("");
  const data = [];
  for (let i = 0; i < 9; i++) {
    data.push({
      id: 1,
      username: "康若曼",
      date: "2018/11/21"
    });
  }
  return data;
}

/** 医院字典 */
export function getHosDic() {
  return service.get<DicLib<HosDic>>("/hospitals");
}

/** 医生字典 */
export function getDocDic() {
  return service.get<DicLib<DocDic>>("/portalDoctors/query");
}
/** 医生新增和详情 */
export function getOneDoc(id:any) {
    return service.get<OneDoc>(`/portalDoctors/${id}`);
}
/** 新增一条医生信息 */
export function postForm(data:any) {
    return service.post(`/portalDoctors`,data);
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
    return service.get("/news/query",{params})
}