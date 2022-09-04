import {
  Inject,
  Controller,
  Get,
  Post,
  Query,
  Body,
  ALL,
} from '@midwayjs/decorator';
import { UserService } from '../service/user.service';
import { res } from '../utils';
import { CreateUserType, GetUserType, ResOp } from '../interface';
import { BaseController } from './base';

@Controller(`/user`)
export class APIController extends BaseController {
  @Inject()
  userService: UserService;

  @Get('/get')
  async getUser(@Query('id') id: number): Promise<ResOp> {
    const user = await this.userService.getUser({ id });
    return res({ data: user });
  }

  @Get('/list')
  async getUserList(): Promise<ResOp> {
    const user = await this.userService.getUserList();
    return res({ data: user });
  }

  @Post('/add')
  async addUser(@Body(ALL) dto: CreateUserType): Promise<ResOp> {
    const result = await this.userService.addUser(dto);
    if (!result) {
      return res({ code: 10001, message: '当前用户已存在！' });
    }
    return res({ message: '添加用户成功' });
  }

  @Post('/del')
  async deleteUser(@Body(ALL) dto: GetUserType): Promise<ResOp> {
    const result = await this.userService.deleteUser(dto);
    if (!result) {
      return res({ code: 10001, message: '该用户用户不存在！' });
    }
    return res({ message: '删除用户成功' });
  }
}
