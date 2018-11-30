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
