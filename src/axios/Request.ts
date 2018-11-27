// import service from "./Service";
// 获取日志列表
import service from "./Service";
import { RestPage } from "../type/CommonData";
import { BlacklistData, Sources } from "../type/SourcesData";

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
// 医院字典
export function getHosDic() {
  // return service.get("");
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      key: "1",
      name: "成都市中心医院",
      level: "三级甲等",
      type: "综合医院",
      address: "四川省成都市金牛区曹家巷",
      tel: "028-6676540"
    });
  }
  return data;
}
// 医生字典
export function getDocDic() {
  // return service.get("");
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      key: "1",
      name: "康若曼",
      level: "主任医师",
      hospital: "四川省人民医院",
      address: "四川省成都市一环路北一段"
    });
  }
  return data;
}
/**
 * 获取号源
 */
export function getSources() {
  return service.get<RestPage<Sources>>("/sources");
}
/**
 * 获取黑名单列表
 */
export function getBlacklist() {
  return service.get<RestPage<BlacklistData>>("/blackLists")
}