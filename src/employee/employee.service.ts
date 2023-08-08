// import { Injectable, Logger, NotFoundException} from '@nestjs/common';
// import { Employee } from '@prisma/client';
// import { PrismaService } from 'src/prisma.service';

// @Injectable()
// export class EmployeeService {
//   constructor(private readonly prisma: PrismaService) {
//   }

//   async getAllEmployees(): Promise<Employee[]> {
  
//     return await this.prisma.employee.findMany();
//   }

//   async getEmployeeById(id: number): Promise<Employee> {
//     const employee = await this.prisma.employee.findUnique({ where: { id } });
//     console.log(employee)
//     if (!employee) throw new NotFoundException()
    
//     return employee
//   }

//   async createEmployee(employee): Promise<Employee> {
//     return await this.prisma.employee.create({ data: employee });
//   }

//   //async updateEmployee(id: number, employee: Employee): Promise<Employee> {
//   async updateEmployee(id, employee): Promise<Employee> {
//     return await this.prisma.employee.update({ where: { id }, data: employee });
//   }
//   async deleteEmployee(id: number) {
//     return this.prisma.employee.delete({ where: { id } });
    
//   }

// }



import { Injectable, Logger, NotFoundException} from '@nestjs/common';
import { Employee, Prisma } from '@prisma/client';
import { UpdateEmployeeDto } from 'src/create-employee.dto';
import { PrismaService } from 'src/prisma.service';
// import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken'


@Injectable()
export class EmployeeService {
  updateEmployeeLocation(body: UpdateEmployeeDto, employeeId: number, locationId: number) {
    throw new Error('Method not implemented.');
  }
  PrismaService: any;
  constructor(private readonly prisma: PrismaService) {
  }
  //  updateEmployeeLocation(body: UpdateEmployeeLocationDto, employeeId: any, locationId: number) {
  //   throw new Error('Method not implemented.');
  // }

  async getAllEmployees(): Promise<Employee[]> {
  
    return await this.prisma.employee.findMany();
  }

  async getEmployeeById(id: number): Promise<Employee> {
    const employee = await this.prisma.employee.findUnique({ where: { id } });
    console.log(employee)
    if (!employee) throw new NotFoundException()
    
    return employee
  }

  async createEmployee(employee): Promise<Employee> {
    return await this.prisma.employee.create({ data: employee });
  }
  async createUser(user) {
    return await this.prisma.user.create({data:user});
  }
  

  //async updateEmployee(id: number, employee: Employee): Promise<Employee> {
  async updateEmployee(id, employee): Promise<Employee> {
    return await this.prisma.employee.update({ where: { id }, data: employee });
  }
  async deleteEmployee(id: number) {
    return this.prisma.employee.delete({ where: { id } });
    
  }

  async signin(id:number, firstName:string){
    const response=await this.prisma.employee.findUnique({
      where: {
        id,
        // name:firstName,
      },
    });
    if(!response) throw new NotFoundException({message:'There is no employee'})
    const jwtToken=await this.generateJwtToken(id, firstName)
    return jwtToken
  }

  async generateJwtToken(id: number, name:string){
    const payload={id, name}
    const jwtToken=await jwt.sign(payload, 'MY_SECRET_TOKEN',{expiresIn:36000})
    return jwtToken
  }

}

