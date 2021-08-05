import { createParamDecorator,ExecutionContext } from "@nestjs/common";
import { Admin } from './interface/admin.interface';

export const getAdmin =  createParamDecorator(


    (data,ctx:ExecutionContext) : Admin =>{
        const req = ctx.switchToHttp().getRequest()
        return req.name
    }







)