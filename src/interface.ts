/**
 * @description Response
 */
export interface ResOp {
  data?: any;
  code?: number;
  message?: string;
}

/**
 * @description User-Service-Get parameters
 */
export interface GetUserType {
  uid: number;
}

/**
 * @description User-Service-Save parameters
 */
export interface CreateUserType {
  username: string;
  email?: string;
  phone?: number;
}
