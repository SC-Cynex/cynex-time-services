import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurationConfig from './config/configuration.config';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    ConfigModule.forRoot({
      load: [configurationConfig],
      isGlobal: true
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
