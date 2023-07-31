// import { Test, TestingModule } from '@nestjs/testing';
// import { EmployeeService } from './employee.service';
// import { PrismaService } from 'src/prisma.service';


// describe('EmployeeService', () => {
//   let service: EmployeeService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [EmployeeService, PrismaService],
//     }).compile();

//     service = module.get<EmployeeService>(EmployeeService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });





  
//   it('should create a new employee', async () => {
//     const createEmployeeDto = { firstName: 'John', lastName: 'Doe', departmentId: 1 };
  
    
//     const mockCreateEmployee = jest.fn().mockResolvedValue(createEmployeeDto);
//     const employeeService = { createEmployee: mockCreateEmployee };
  
    
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [EmployeeController],
//       providers: [{ provide: EmployeeService, useValue: employeeService }],
//     }).compile();
  
//     const controller = module.get<EmployeeController>(EmployeeController);
  
    
//     const response = await supertest(controller.createEmployee(createEmployeeDto));
//     console.log(response)
    
    
  
    
//   expect(response).toBe(201);
//   expect(response).toEqual(createEmployeeDto);
// })





    


// import { Test } from '@nestjs/testing';
// import { EmployeeService } from './employee.service';
// import { PrismaService } from 'src/prisma.service';

// describe('EmployeeService', () => {
//   let employeeService: EmployeeService;
//   let prismaService: PrismaService;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       providers: [EmployeeService, PrismaService],
//     }).compile();

//     employeeService = moduleRef.get<EmployeeService>(EmployeeService);
//     prismaService = moduleRef.get<PrismaService>(PrismaService);
//   });

//   it('should be defined', () => {
//     expect(employeeService).toBeDefined();
//   });

//   // Write your test cases for each CRUD operation

//   it('should create an employee', async () => {
//     const newEmployee = await employeeService.createEmployee({
//       firstName: 'John',
//       lastName: 'Doe',
//       departmentId: 1
//     });

//     expect(newEmployee).toHaveProperty('id');
//     expect(newEmployee.firstName).toBe('John');
//     expect(newEmployee.lastName).toBe('Doe');
//     expect(newEmployee.departmentId).toBe(1);
//   });

//   it('should get all employees', async () => {
//     // Create some sample employees using the Prisma client directly
//     await prismaService.employee.createMany({
//       data: [
//         { firstName: 'Alice', lastName: 'Smith', departmentId: 2 },
//         { firstName: 'Bob', lastName: 'Johnson', departmentId: 3 },
//       ],
//     });

//     const allEmployees = await employeeService.getAllEmployees();
//     expect(allEmployees)
//   });

//   it('should get an employee by ID', async () => {
//     const newEmployee = await employeeService.createEmployee({
//       firstName: 'Jane',
//       lastName: 'Doe',
//       departmentId: 1,
//     });

//     const foundEmployee = await employeeService.getEmployeeById(newEmployee.id);
//     expect(foundEmployee).toBeDefined();
//     expect(foundEmployee?.id).toBe(newEmployee.id);
//     expect(foundEmployee?.firstName).toBe('Jane');
//     expect(foundEmployee?.lastName).toBe('Doe');
//     expect(foundEmployee?.departmentId).toBe(1);
//   });

//   it('should update an employee', async () => {
//     const newEmployee = await employeeService.createEmployee({
//       firstName: 'Michael',
//       lastName: 'Smith',
//       departmentId :1,
//     });

//     const updatedEmployee = await employeeService.updateEmployee(newEmployee.id, {
//       firstName: 'Mike',
//       lastName: 'Johnson',
//       departmentId:1,
//     });

//     expect(updatedEmployee.id).toBe(newEmployee.id);
//     expect(updatedEmployee.firstName).toBe('Mike');
//     expect(updatedEmployee.lastName).toBe('Johnson');
//     expect(updatedEmployee.departmentId).toBe(1);
//   });
//   it('should delete an employee', async () => {
//     const newEmployee = await employeeService.createEmployee({
//       firstName: 'David',
//       lastName: 'Williams',
//       departmentId: 1,
//     });

//     const deletedEmployee = await employeeService.deleteEmployee(newEmployee.id);
//     expect(deletedEmployee.id).toBe(newEmployee.id);

//     // Check that the employee is actually deleted by trying to fetch it

//     // const foundEmployee = await employeeService.getEmployeeById(newEmployee.id);
//     // expect(foundEmployee).toBeNull();
//   });
// });





import { Test } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import supertest from 'supertest';
import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { Prisma } from '@prisma/client';

    
const mockReturnEmployeesData = [
  {
      id: 6,
      firstName: "raj",
      lastName: "shekar",
      departmentId: 3
  },
]

const mockReturnEmployee =  {
  // id: 6,
  firstName: "raj",
  lastName: "shekar",
  departmentId: 3
}

describe('EmployeeController', () => {
  let employeeController: EmployeeController;

  let employeeService: EmployeeService;
  let prismaService: PrismaService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [EmployeeController],
        providers: [EmployeeService, {
          provide: PrismaService,          
          useValue: {
            employee: {
              findMany: jest.fn().mockReturnValue(mockReturnEmployeesData),
              create: jest.fn().mockReturnValue(mockReturnEmployee),
              update: jest.fn().mockReturnValue(mockReturnEmployee),
              delete: jest.fn().mockReturnValue(mockReturnEmployee)

            }
          }
        }],
      }).compile();
      

    employeeService = moduleRef.get<EmployeeService>(EmployeeService);
    prismaService = moduleRef.get<PrismaService>(PrismaService)
  });

  describe('Get Employees', () => {
    it('should be defined', async () => {
      const result = jest.fn().mockReturnValue(mockReturnEmployeesData)
      jest.spyOn(prismaService.employee,'findMany').mockImplementation(result);

      await employeeService.getAllEmployees()
      // expect(result).toBeCalledWith()
      // expect(await employeeController.findMany()).toBe(result);

    });
  });

  describe('Create Employee', () => {
    it('Create an Employee', async () => {
      const result = jest.fn().mockReturnValue(mockReturnEmployee)
      jest.spyOn(prismaService.employee,'create').mockImplementation(result);

      await employeeService.createEmployee(
        {
          id: 6,
          firstName: "raj",
          lastName: "shekar",
          departmentId: 3
      }
      )

    });
  });

  describe("Update Employee", () => {
    it('update an employee', async () => {
      const mockUpdateEmployee = jest.fn().mockReturnValue(mockReturnEmployee)
      jest.spyOn(prismaService.employee, 'update').mockImplementation(mockUpdateEmployee)
      await employeeService.updateEmployee(6, mockReturnEmployee)
      expect(mockUpdateEmployee).toBeCalledWith({
        where: {
          id: 6
        },
        data: {
          firstName: "raj",
          lastName: "shekar",
          departmentId: 3
        }
      })
    })
  })

  describe("Delete Employee", ()=>{
    it('delete an employee', async ()=>{
      const mockDeleteEmployee = jest.fn().mockReturnValue(mockReturnEmployee)
      jest.spyOn(prismaService.employee, 'delete').mockImplementation(mockDeleteEmployee)
      await employeeService.deleteEmployee(6)
      expect(mockDeleteEmployee).toBeCalledWith({
        where:{
          id:6
        }
      })
    })
  })
});

