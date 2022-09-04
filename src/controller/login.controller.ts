import { Inject, Controller, Post, Body, ALL } from '@midwayjs/decorator';
import { isEmpty } from 'lodash';
import { UserService } from '../service/user.service';
import { LoginService } from '../service/login.service';
import { res } from '../utils';
import { ResOp, CreateUserType, LoginInfoType } from '../interface';
import { BaseController, NOAUTH_PREFIX_URL } from './base';

@Controller(`${NOAUTH_PREFIX_URL}`)
export class APIController extends BaseController {
  @Inject()
  userService: UserService;

  @Inject()
  loginService: LoginService;

  @Post('/register')
  async register(@Body(ALL) dto: CreateUserType): Promise<ResOp> {
    const result = await this.userService.addUser(dto);
    if (!result) {
      return res({ code: 10001, message: '当前用户已注册！' });
    }
    return res({ message: '注册成功' });
  }

  @Post('/login')
  async saveUser(@Body(ALL) dto: LoginInfoType): Promise<ResOp> {
    const sign = await this.loginService.login(dto.username, dto.password);
    if (isEmpty(sign)) {
      return res({ message: '用户名密码有误' });
    }
    return res({ data: sign, message: '登录成功' });
  }
}
