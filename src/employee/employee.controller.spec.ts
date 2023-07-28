import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { PrismaService } from 'src/prisma.service';
import { EmployeeService } from './employee.service';


describe('EmployeeController', () => {
  let controller: EmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService, PrismaService]
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});


// import { Test, TestingModule } from '@nestjs/testing';
// import { EmployeeController } from './employee.controller';
// import { EmployeeService } from './employee.service';
// import supertest from 'supertest';
// import { PrismaService } from 'src/prisma.service';

// describe('EmployeeController', () => {
//   let controller: EmployeeController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [EmployeeController],
//       providers: [EmployeeService, PrismaService],
//     }).compile();

//     controller = module.get<EmployeeController>(EmployeeController);
//   });

  
//   it('should create a new employee', async () => {
//     const createEmployeeDto = { firstName: 'John', lastName: 'Doe', departmentId: 1 };
  
    
//     const mockCreateEmployee = jest.fn().mockResolvedValue(createEmployeeDto);
//     const employeeService = { createEmployee: mockCreateEmployee };
  
    
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [EmployeeController],
//       providers: [{ provide: EmployeeService, useValue: employeeService }],
//     }).compile();
  
//     controller = module.get<EmployeeController>(EmployeeController);
  
    
//     const response = await supertest(controller.createEmployee(createEmployeeDto));
//     console.log(response)
  
    
//     // expect(response.status).toBe(201);
//     // expect(response.body).toEqual(createEmployeeDto);
          
//       });
    
//   });


// describe('EmployeeController', () => {
//   let employeeController: EmployeeController;
//   let employeeService: EmployeeService;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//         controllers: [EmployeeController],
//         providers: [EmployeeService, PrismaService],
//       }).compile();

//     employeeService = moduleRef.get<EmployeeService>(EmployeeService);
//     employeeController = moduleRef.get<EmployeeController>(EmployeeController);
//   });

//   describe('findMany', () => {
//     it('should be defined', async () => {
//       const result = ['test'];
//       jest.spyOn(employeeService,'findMany').mockImplementation(() => result);
//       expect(await employeeController.findMany()).toBe(result);
//     });
//   });
// });

// const video = require('./video');

// test('plays video', () => {
//   const spy = jest.spyOn(video, 'play');
//   const isPlaying = video.play();

//   expect(spy).toHaveBeenCalled();
//   expect(isPlaying).toBe(true);



