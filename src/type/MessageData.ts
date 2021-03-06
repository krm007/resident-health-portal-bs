// 筛选推送消息
export interface FilterArr {
    firstType?: string,
    secondType?: string
}
// 信息推送
export interface PushList {
    id?: string,
    createTime?: string,
    updateTime?: string,
    status?: number,
    firstType?: string,
    secondType?: string,
    content?: string,
    _links?:any
}
// 获取一条消息用于回显
export interface OneList {
    id?: string,
    createTime?: string,
    updateTime?: string,
    status?: number,
    firstType?: string,
    secondType?: string,
    content?: string,
    _links?:any,
    title?:string
}
// 提交新增推送消息
export interface News {
    id:string,
    title:string,
    content: string,
    secondType: string
}
// 查询所有认证
export interface verifyList {
    aboveUrl?: string,
    accountId?: string,
    applicateTime?: string,
    belowUrl?: string,
    createTime?: string,
    id?: string,
    idCard?: string,
    realName?: string,
    state?: number,
    status?: number,
    updateTime?: string
}
// 查询一条认证信息
export interface verifyOneList {
    aboveUrl?: string,
    applicateTime?: string,
    belowUrl?: string,
    createTime?: string,
    defaultTimes?: string,
    id?: string,
    idCard?: string,
    realName?: string,
    state?: number,
    status?: number,
    updateTime?: string,
    user?:any,
    userId?: string,
    verifyStatus?: string
}