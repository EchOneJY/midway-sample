/**
 * @description Response
 */
export interface ResOp {
  data?: any;
  code?: number;
  message?: string;
}

/**
 * @description User-Login parameters
 */
export interface LoginInfoType {
  username: string;
  password: string;
}

export interface LoginReturnInfoType {
  userId: number;
  username: string;
  token: string;
}

/**
 * @description User-Service-Get parameters
 */
export interface GetUserType {
  id: number;
}

/**
 * @description User-Service-Save parameters
 */
export interface CreateUserType {
  username: string;
  email?: string;
  phone?: number;
  password?: string;
  headImg?: string;
  remark?: string;
}
