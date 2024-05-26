import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurationConfig from './config/configuration.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      load: [configurationConfig],
      isGlobal: true
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
