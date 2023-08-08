import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
// import { DepartmentService } from './department/department.service';
import { LoggerService } from './logger/logger.service';
import {APP_FILTER, APP_INTERCEPTOR} from '@nestjs/core'
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { HttpErrorFilter } from './logger/http-error.filter';
import { EmployeeService } from './employee/employee.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [EmployeeModule, AuthModule],
  controllers: [],
  providers: [LoggerService, EmployeeService, PrismaService, {
    provide: APP_INTERCEPTOR, useClass: LoggerInterceptor},
    // {provide: APP_FILTER , useClass: HttpErrorFilter}
  ],
})
export class AppModule {}


