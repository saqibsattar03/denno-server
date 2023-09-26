import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './common/db/db.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthModule } from './common/auth/auth.module';
import { PrivacyPolicyModule } from './modules/privacy-policy/privacy-policy.module';
import { ContactUsModule } from './modules/contact-us/contact-us.module';
import { ProjectModule } from './modules/project/project.module';
import { MilestoneModule } from './modules/milestone/milestone.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './common/utils/fileUpload.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    MulterModule.register(multerConfig),
    DbModule,
    AuthModule,
    ProfileModule,
    PrivacyPolicyModule,
    ContactUsModule,
    MilestoneModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
