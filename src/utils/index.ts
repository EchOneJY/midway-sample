import { Provide } from '@midwayjs/decorator';
import * as CryptoJS from 'crypto-js';
import { nanoid } from 'nanoid';
import ErrorConstants from './error_constants';
import { ResOp } from '../interface';

export function res(op?: ResOp): ResOp {
  return {
    data: op?.data ?? null,
    code: op?.code ?? 200,
    message: op?.code
      ? getErrorMessageByCode(op!.code) || op?.message || '未知错误'
      : op?.message || '请求成功',
  };
}

/**
 * 根据code获取错误信息
 */
export function getErrorMessageByCode(code: number): string {
  return ErrorConstants[code];
}

@Provide()
export class Utils {
  /**
   * 生成一个UUID
   */
  generateUUID(): string {
    return nanoid();
  }

  /**
   * md5加密
   */
  md5(msg: string): string {
    return CryptoJS.MD5(msg).toString();
  }
}
