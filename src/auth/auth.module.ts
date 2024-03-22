import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { CurrentUserInterceptor } from './user.interceptor';
import { AuthController } from './auth.controller';

export const jwtConstantss = {
  secret: 'g§ueve45u§eyvZeicne',
};

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstantss.secret,
      signOptions: { expiresIn: 60 * 60 * 8 + 's' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, CurrentUserInterceptor],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
