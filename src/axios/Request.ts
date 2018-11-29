
import service from "./Service";
import { RestPage } from "../type/CommonData";
import { Sources } from "../type/SourcesData";

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
export function getSources() {
  return service.get<RestPage<Sources>>("/sources");
}
