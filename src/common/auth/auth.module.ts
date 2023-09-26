import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from '../../modules/profile/profile.module';
import * as process from 'process';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    ProfileModule,
    JwtModule.register({
      global: true,

      //*** add secret key here ***//
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  exports: [AuthService, AuthModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
