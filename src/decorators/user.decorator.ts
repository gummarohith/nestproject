import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { createParamDecorator} from "@nestjs/common/decorators/http";
import { ApiUnauthorizedResponse } from "@nestjs/swagger";

export const User=createParamDecorator((data, context:ExecutionContext)=>{
    const request = context.switchToHttp().getRequest();
    if (!request.user) throw new UnauthorizedException({message: 'required JWT Token'})
    console.log('this is user decorator')
    return request.user
})