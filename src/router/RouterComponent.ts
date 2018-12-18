import * as loadable from "react-loadable";
import Loading from "../component/Loading";
export const Login = loadable({
    loading: Loading,
    loader: () => import("../views/login/Login")
});
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
export const Blacklist = loadable({
    loading: Loading,
    loader: () => import("../views/blacklist/Blacklist")
});
export const InfoPushNew = loadable({
    loading: Loading,
    loader: () => import("../views/infoPush/InfoPushNew")
});
export const DoctorsDictionary = loadable({
    loading: Loading,
    loader: () => import("../views/MedicalResource/DoctorsDictionary")
});
export const DocDetails = loadable({
    loading: Loading,
    loader: () => import("../views/MedicalResource/DocDetails")
});
export const Certification = loadable({
    loading: Loading,
    loader: () => import("../views/user/Certification")
});
export const Verify = loadable({
    loading: Loading,
    loader: () => import("../views/user/CertificateList")
});
export const HospitalDictionary = loadable({
    loading: Loading,
    loader: () => import("../views/MedicalResource/HospitalDictionary")
});
export const HosDetails = loadable({
    loading: Loading,
    loader: () => import("../views/MedicalResource/HosDetails")
});