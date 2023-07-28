import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
// import { DepartmentService } from './department/department.service';


@Module({
  imports: [EmployeeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
