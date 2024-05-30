import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurationConfig from './config/configuration.config';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { TeamModule } from './modules/team/team.module';
import { DepartmentModule } from './modules/department/department.module';
import { SeedModule } from './services/seed/seed.module';
import { SeedService } from './services/seed/seed.service';
import { PointModule } from './modules/point/point.module';
import { HourModule } from './modules/hour/hour.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    TeamModule,
    DepartmentModule,
    SeedModule,
    PointModule,
    ConfigModule.forRoot({
      load: [configurationConfig],
      isGlobal: true
    }),
    HourModule,
  ],
  controllers: [],
  providers: [
    SeedService
  ],
})
export class AppModule {}
