
/** 医生字典 */
export interface DocDic {
    avatarUrl?: string;
    createTime?: Date;
    depart?: string;
    departId?: string;
    detail?: string;
    experts?: string[];
    hospital?: string;
    id?: string;
    introduction?: string;
    level?: string;
    major?: string;
    name?: string;
    skillful?: string;
    status?: number;
    title?: string;
    updateTime?: Date;
}


/** 当前用户详情信息 */
export interface OneDoc {
    avatarUrl?: string;
    createTime?: Date;
    depart?: string;
    departId?: string;
    detail?: string;
    experts?: string[];
    hospital?: string;
    id?: string;
    introduction?: string;
    level?: string;
    links?: Link[];
    major?: string;
    name?: string;
    skillful?: string;
    status?: number;
    title?: string;
    updateTime?: Date;
}
export interface Link {
    href?: string;
    rel?: string;
    templated?: boolean;
}