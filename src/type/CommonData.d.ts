/**
 * 分页参数
 */
export interface BocoPage<T> {
  content: T[];
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable;
  size?: number;
  sort?: Sort2;
  totalElements?: number;
  totalPages?: number;
}

export interface Sort {
  sorted?: boolean;
  unsorted?: boolean;
}

export interface Pageable {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
}

export interface Sort2 {
  sorted?: boolean;
  unsorted?: boolean;
}

/**
 * 科室列表信息
 */
export interface Depart {
  detail?: string;
  id?: string;
  name?: string;
  headcount: number;
}

export interface Self {
  href: string;
}

export interface AdvanceRecord2 {
  href: string;
}

export interface Links {
  self: Self;
  advanceRecord: AdvanceRecord2;
}

export interface AdvanceRecord {
  id: string;
  createTime: string;
  updateTime: string;
  status: number;
  hospitalName: string;
  hospitalId: string;
  departmentName: string;
  doctorName: string;
  doctorId: string;
  visitor?: any;
  visitorId?: any;
  bookingFee: string;
  bookingTime: string;
  visitTime?: any;
  visitArea: number;
  state: number;
  commentState: number;
  _links: Links;
}

export interface Embedded<T> {
  model: T[];
}

export interface Self2 {
  href: string;
  templated: boolean;
}

export interface Profile {
  href: string;
}

export interface Links2 {
  self: Self2;
  profile: Profile;
}

export interface Page {
  size?: number;
  totalElements?: number;
  totalPages?: number;
  number: number;
}

export interface RestPage<T> {
  _embedded: any;
  _links?: Links2;
  page: Page;
}
/**
 * 共公的返回数据格式
 */
export interface CommonResult<T> {
  code: number;
  msg: string;
  data: T[];
}
