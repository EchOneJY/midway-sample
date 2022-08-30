import {
  Inject,
  Controller,
  Get,
  Post,
  Query,
  Body,
  ALL,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { CreateUserType, ResOp } from '../interface';

@Controller('/user')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get')
  async getUser(@Query('uid') uid: number) {
    const user = await this.userService.getUser({ uid });
    return { code: 200, message: 'OK', data: user };
  }

  @Post('/save')
  async saveUser(@Body(ALL) dto: CreateUserType): Promise<ResOp> {
    const user = await this.userService.saveUser(dto);
    return { code: 200, message: 'OK', data: user };
    // const result = await this.userService.saveUser(dto);
    // if (!result) {
    //   return res({ code: 10001 });
    // }
    // return res();
  }
}
