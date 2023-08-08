
// dto.employee.ts

import { Department } from "@prisma/client";

// import { Department } from './dto.department';

export class EmployeeDTO {
  id: number;
  firstName: string;
  lastName: string;
  departmentId: number;
  department: Department;
  user: UserDTO[];
}

export class UserDTO {
  id: number;
  name: string;
  employeeId: number;
  createdAt: Date;
  updatedAt: Date;
  status: number;
}

export class DepartmentDto {
  id: number;
  name: string;
  description: string;
  employees: EmployeeDTO[];
}
export class SigninDto{
    id:number;
    firstName:string;

}
export class ResponseDto {
id: number;
  firstName: string;
  lastName: string;
}
