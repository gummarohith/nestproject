import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from '@prisma/client';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateEmployeeDto, UpdateEmployeeDto } from 'src/create-employee.dto';

@Controller('employees')
export class EmployeeController {
  findMany: any;
  
  
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  getAllEmployees(): Promise<Employee[]> {
    return this.employeeService.getAllEmployees();
  }

  @Get(':id')
  getEmployeeById(@Param('id',ParseIntPipe) id: number): Promise<Employee> {
    return this.employeeService.getEmployeeById(id);
  }



@Post()
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiCreatedResponse({ description: 'The employee has been successfully created.'})
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.createEmployee(createEmployeeDto);
  }



@Put(':id')
@ApiOperation({ summary: 'Update an employee by ID' })
@ApiOkResponse({ description: 'The employee has been successfully updated.' })
@ApiNotFoundResponse({ description: 'Employee not found.' })
updateEmployee(
  @Param('id',ParseIntPipe) id: number,
  @Body() updateEmployeeDto: UpdateEmployeeDto,
): Promise<Employee> {
  return this.employeeService.updateEmployee(id, updateEmployeeDto);
}

  @Delete(':id')
  deleteEmployee(@Param('id',ParseIntPipe) id: number) {
    const del= this.employeeService.deleteEmployee(id);
    console.log(del);
  }
}