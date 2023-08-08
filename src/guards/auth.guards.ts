import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma.service';


interface jwtPayloadInterface {
    name:string;
    id:number;
    iat:number;
    exp:number;
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly prismaService:PrismaService) {}

    async canActivate(context: ExecutionContext) {
        const request =context.switchToHttp().getRequest();
        const jwtToken= request.headers?.authorization?.split(' ')[1];
        console.log(jwtToken)
        try{
            const payload =(await jwt.decode(jwtToken)) as jwtPayloadInterface;
            console.log({payload: payload})

            const employee =await this.prismaService.employee.findUnique({
                where: {
                    id: payload.id,
                },
            });
            console.log(employee)
            if (employee.firstName !== payload.name) throw new NotFoundException();

            return true;
        }catch (error){
            return false;
        }
    }
}