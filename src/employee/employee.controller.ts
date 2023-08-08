// import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, Logger } from '@nestjs/common';
// import { EmployeeService } from './employee.service';
// import { Employee } from '@prisma/client';
// import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
// import { CreateEmployeeDto, UpdateEmployeeDto } from 'src/create-employee.dto';

// @Controller('employees')
// export class EmployeeController {
   

  
//   constructor(private readonly employeeService: EmployeeService) {}

//   @Get()
//   getAllEmployees(): Promise<Employee[]> {
//     //this.logger.verbose('User "${user.username}" retrieving all tasks.filters: ${JSON.stringify(filterDto)}');
//     return this.employeeService.getAllEmployees();
//   }

//   @Get(':id')
//   getEmployeeById(@Param('id',ParseIntPipe) id: number): Promise<Employee> {
//     return this.employeeService.getEmployeeById(id);
//   }



// @Post()
//   @ApiOperation({ summary: 'Create a new employee' })
//   @ApiCreatedResponse({ description: 'The employee has been successfully created.'})
//   createEmployee(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
//     return this.employeeService.createEmployee(createEmployeeDto);
//   }



// @Put(':id')
// @ApiOperation({ summary: 'Update an employee by ID' })
// @ApiOkResponse({ description: 'The employee has been successfully updated.' })
// @ApiNotFoundResponse({ description: 'Employee not found.' })
// updateEmployee(
//   @Param('id',ParseIntPipe) id: number,
//   @Body() updateEmployeeDto: UpdateEmployeeDto,
// ): Promise<Employee> {
//   return this.employeeService.updateEmployee(id, updateEmployeeDto);
// }

//   @Delete(':id')
//   deleteEmployee(@Param('id',ParseIntPipe) id: number) {
//     const del= this.employeeService.deleteEmployee(id);
//     console.log(del);
//   }
// }


import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, Logger, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from '@prisma/client';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateEmployeeDto, UpdateEmployeeDto } from 'src/create-employee.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { User } from 'src/decorators/user.decorator';
import { ResponseDto, SigninDto } from 'src/dto/employee.dto';

@Controller('employees')
export class EmployeeController {
  //private readonly logger=new Logger(EmployeeController.name);
  constructor(private readonly employeeService: EmployeeService) {}

  // @Get()
  // @UseGuards(AuthGuard)
  // getAllEmployees(): Promise<Employee[]> {
  //   return this.employeeService.getAllEmployees();
  // }

  @Get()
  @UseGuards(AuthGuard)
  async getAllEmployees(
  ): Promise<ResponseDto[]>{
    return await this.employeeService.getAllEmployees()
  }

  // @Get(':id')
  // @UseGuards(AuthGuard)
  // getEmployeeById(@Param('id',ParseIntPipe) id: number): Promise<Employee> {
  //   return this.employeeService.getEmployeeById(id);
  // }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getEmployeeById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<ResponseDto>{
    const employee=await this.employeeService.getEmployeeById(id)
    return employee
  }



// @Post()
//   @ApiOperation({ summary: 'Create a new employee' })
//   @ApiCreatedResponse({ description: 'The employee has been successfully created.'})
//   createEmployee(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    
//     return this.employeeService.createEmployee(createEmployeeDto);
//   }

@Post('signin')
async signin(@Body() body:SigninDto){
  return await this.employeeService.signin(body.id, body.firstName);
}

@Post()
async createEmployee(
  @Body() body:CreateEmployeeDto,
){
  const createEmployee =await this.employeeService.createEmployee(body)
  return createEmployee
}








@Put(':id')
@UseGuards(AuthGuard)
@ApiOperation({ summary: 'Update an employee by ID' })
@ApiOkResponse({ description: 'The employee has been successfully updated.' })
@ApiNotFoundResponse({ description: 'Employee not found.' })
updateEmployee(
  @Param('id',ParseIntPipe) id: number,
  @Body() updateEmployeeDto: UpdateEmployeeDto,
): Promise<Employee> {
  return this.employeeService.updateEmployee(id, updateEmployeeDto);
}


 @Put(':id')
 @UseGuards(AuthGuard)
 async UpdateEmployeeDto(
  @Param('id') id:number,
  @Body() body:UpdateEmployeeDto,
  @User() user) {
    console.log(body)
    // if (user.id===id)
  return await this.employeeService.updateEmployee(body, id)
  }

  @Put("/:employeeId/location/:id")
  @UseGuards(AuthGuard)
  async updateEmployeeLocation(
    @Param('employeeId') employeeId:number,
    @Param('id') locationId:number,
    @Body() body:UpdateEmployeeDto
  ) {
    this.employeeService.updateEmployeeLocation(body, employeeId, locationId)
  }

  //  @Delete(':id')
  //  @UseGuards(AuthGuard)
  //  deleteEmployee(@Param('id',ParseIntPipe) id: number) {
  //    const del= this.employeeService.deleteEmployee(id);
  //    console.log(del);
  //  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  async deleteEmployeeDetails(@Param('id') id:number) {
    return await this.employeeService.deleteEmployee(id)
  }

}