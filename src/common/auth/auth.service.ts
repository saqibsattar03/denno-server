import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { ProfileService } from '../../modules/profile/profile.service';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { comparePassword } from '../utils/paswordHashing.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userDto: any) {
    return this.profileService.createUser(userDto);
  }

  async validateUser(email: string, enteredPassword: string): Promise<any> {
    const user = await this.profileService.fetchByEmailAndPassword(email);
    if (!user) {
      throw new NotAcceptableException(
        'An account with these credentials does not exist. Please create your account first.',
      );
    }
    const isValidPassword = await comparePassword(
      enteredPassword,
      user.password,
    );
    if (user && isValidPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: any): Promise<any> {
    const fetchedUser = await this.profileService.fetchByEmail(user.email);

    const payload = {
      email: fetchedUser.email,
      sub: fetchedUser._id,
    };

    // return {
    //   access_token: await this.jwtService.signAsync(
    //     {
    //       email: fetchedUser.email,
    //       sub: fetchedUser._id,
    //     },
    //     {
    //       privateKey: process.env.SECRET_KEY,
    //     },
    //   ),
    // };
    const access_token = await this.jwtService.signAsync(payload, {
      privateKey: process.env.SECRET_KEY,
    });
    //
    return { user_id: fetchedUser._id, access_token };
  }

  async fetchUserProfileUsingToken(email: string): Promise<any> {
    const fetchedUser = await this.profileService.fetchByEmail(email);
    // const fetchedUser = await this.userModel.findOne({ email: email });
    if (!fetchedUser)
      throw new HttpException(
        'no user with entered email found',
        HttpStatus.NOT_FOUND,
      );
    return fetchedUser;
  }
}
