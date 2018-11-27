import * as loadable from "react-loadable";
import Loading from "../component/Loading";

export const NosourceManagement = loadable({
  loading: Loading,
  loader: () => import("../views/no-source-management/NosourceManagement")
});
export const BannerManage = loadable({
  loading: Loading,
  loader: () => import("../views/bannerManage/BannerManage")
});
export const InfoPush = loadable({
  loading: Loading,
  loader: () => import("../views/infoPush/InfoPushList")
});
