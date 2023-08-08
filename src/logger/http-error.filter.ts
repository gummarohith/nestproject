import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { LoggerService } from "./logger.service";


@Catch()
export class HttpErrorFilter implements ExceptionFilter{
    constructor(private readonly logger: LoggerService){}
    catch(exception:HttpException, host:ArgumentsHost){
        const ctx=host.switchToHttp();
        const request=ctx.getRequest();
        const response=ctx.getResponse();
        const status= exception.getStatus();
        const { method, originalUrl, ip }=request;
        const statusMessage=exception.message;
        const exceptionResponse=exception.getResponse()
        console.log(exceptionResponse)

        const errorResponse={
            timeStamp:new Date(),
            path:request.originalUrl,
            errorMessage:exceptionResponse || exception.message || null
        }
        this.logger.error(`Incoming request: ${method} ${originalUrl} from ${ip}, outgoing Error reponse: ${status} ${statusMessage}`, `${status}`)
        response.status(status).json(errorResponse)
    }
}