import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { EmployeeService } from "src/employee/employee.service";
import { LoggerService } from "src/logger/logger.service";

@Injectable()
export class LoggerInterceptor implements NestInterceptor{

    constructor(private readonly logger : LoggerService, 
                private readonly employeeService: EmployeeService){}

    intercept(context: ExecutionContext, next: CallHandler<any>) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const { method, originalUrl, ip } = request;
        
        const startTime = Date.now();
        return next.handle().pipe(
            tap(async() => {
                const endTime = Date.now();
                const resTime = endTime - startTime 
                const { statusCode, statusMessage } = response;

                const id = 15;

                const user = {
                    name: method,
                    status: statusCode,
                    employeeId: id
                }

                const createdUser = await this.employeeService.createUser(user)
                console.log(createdUser)
                
                console.log(`${request.method}, ${request.originalUrl}, ${response.statusCode}, ${resTime}ms`)
                this.logger.log(`Incoming request: ${method} ${originalUrl} from ${ip}, Outgoing response: ${statusCode} ${statusMessage}, TimeTaken:${resTime}ms`);
            })
            )
        }
    }
                
                


    
    