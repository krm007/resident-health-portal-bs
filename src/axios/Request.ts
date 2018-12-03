import service from "./Service";
import { RestPage } from "../type/CommonData";
import { BlacklistData, Sources } from "../type/SourcesData";
import { PushList, OneList, AddNews } from "../type/MessageData";

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
  return service.get("/hospitals");
}

/** 医生字典 */
export function getDocDic() {
  return service.get("/doctors");
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
export function getInfoOneList(id: any) {
  return service.get<OneList>(`/news/${id}`);
}
// 新增一条推送
export function addNew(data: AddNews) {
  return service.post("/news", data);
}
// 删除一条推送
export function delateNew(id: string) {
  return service.delete(`/news/${id}`);
}
