import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { RedisService } from '@midwayjs/redis';
import { isEmpty } from 'lodash';
import { NOAUTH_PREFIX_URL } from '../controller/base';
import { res } from '../utils';
import { ResOp } from '../interface';

@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const url = ctx.url;
      const token = ctx.get('Authorization');
      if (url.startsWith(`${NOAUTH_PREFIX_URL}`)) {
        await next();
        return;
      }
      if (isEmpty(token)) {
        // 无法通过token校验
        this.reject(ctx, { code: 11001 });
        return;
      }
      const redisService = await ctx.requestContext.getAsync(RedisService);
      const redisToken = await redisService.get('token');
      if (redisToken !== token) {
        this.reject(ctx, { code: 11002 });
        return;
      }
      // pass
      await next();
    };
  }

  reject(ctx: Context, op: ResOp): void {
    ctx.status = 200;
    ctx.body = res(op);
  }

  static getName(): string {
    return 'auth';
  }
}
