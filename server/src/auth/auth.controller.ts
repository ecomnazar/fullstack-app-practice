import { BadRequestException, Controller } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    const passwordIsMatch = await argon2.verify(user.password, password);
    if (user && passwordIsMatch) {
      return user;
    }
    throw new BadRequestException('User or password an incorrect');
  }
}
