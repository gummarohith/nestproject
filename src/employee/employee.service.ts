import { Injectable, NotFoundException} from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

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

  //async updateEmployee(id: number, employee: Employee): Promise<Employee> {
  async updateEmployee(id, employee): Promise<Employee> {
    return await this.prisma.employee.update({ where: { id }, data: employee });
  }
  async deleteEmployee(id: number) {
    return this.prisma.employee.delete({ where: { id } });
  }

}