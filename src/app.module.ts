import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurationConfig from './config/configuration.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurationConfig],
      isGlobal: true
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
