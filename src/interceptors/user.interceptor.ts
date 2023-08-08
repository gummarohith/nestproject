import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { tap } from "rxjs";
import { User } from "src/decorators/user.decorator";
import { PrismaService } from "src/prisma.service";
import * as jwt from 'jsonwebtoken';



interface jwtPayloadInterface {
    name:string;
    id:number;
    iat:number;
    exp:number;
}

export class UserInterceptor implements NestInterceptor {
    constructor(private readonly prismaService: PrismaService) {}

    async intercept(context:ExecutionContext, next:CallHandler<any>) {
        const request=context.switchToHttp().getRequest();
        const jwtToken=request?.headers?.authorization?.split(' ')[1];
        const payload =(await jwt.decode(jwtToken)) as jwtPayloadInterface;
        request.user=User;
        const {method}=request;

        return next.handle().pipe(
            tap(async () =>{
                const dateTime=new Date();
                const {statusCode}=context.switchToHttp().getResponse();
                let id=1;
                const User = request.user
                if (request.user){
                    id=User.id
                }
                console.log({employeeId:id})
            }),

        );
    }
}