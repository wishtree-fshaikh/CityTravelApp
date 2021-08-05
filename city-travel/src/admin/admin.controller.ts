import { BadRequestException, Controller, NotFoundException, Param, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Post,Body,Get } from '@nestjs/common';
import { Admin } from './interface/admin.interface';
import { AdminService } from './admin.service';
import { CreateAdmin } from './dto/create-admin-dto';
import { PassThrough } from 'stream';
import { AuthAdmin } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { request, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import path from 'path/posix';
import { log } from 'console';
const bcrypt = require("bcrypt")
//---------------Done With Import---------------//


@Controller('admin')
export class AdminController {
    constructor(private readonly adminService:AdminService,private jwtservice:JwtService){}

    @Post()
    async createAdmin(@Body() createAdmin:CreateAdmin):Promise<Admin>{
            return this.adminService.createAdmin(createAdmin)
    }

    // @Get(':id')
    // findOne(@Param('id') id):Promise<Admin>{
    //     return this.adminService.findOne(id)
    // }

    @Post("login")
    async Login(
    @Body() body:AuthAdmin,
    @Res({passthrough:true}) response:Response,
    ){

      // return this.adminService.ValidateAdmin(body.email,body.password)
          const adminn = await this.adminService.findOneAdmin(body.email)
          const name = adminn.name
          const email = adminn.email
          console.log(name);
          
          if(!adminn)
          {
              throw new NotFoundException("not found")
          }
          console.log(adminn);
  
          const  bc = await bcrypt.compare(body.password,adminn.password)
         if(!bc)
         {
             console.log(bc);
             
             throw new BadRequestException("sd")
         }
  
          const payLoad = {email,name};
          console.log("pay",payLoad);
          
          const accesstoken : string = await this.jwtservice.sign(payLoad)

           const k = response.cookie('jwt',accesstoken,{httpOnly:true});
          console.log(accesstoken);
          
       
          
            return name
         //return accesstoken;
         
          // get auth admin

         //return name
         
        
    }


    @Get("authh")
    async getAdmin(@Req() request:Request){
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtservice.verifyAsync(cookie);
    

          if(!data)
          {
              throw new UnauthorizedException(" ");
              
          }
                      return data.name;

      
        } catch (error) {
            throw new UnauthorizedException("");
            
        }
        console.log(request
            );
        
    // return "str"

    }

    @Post('test')
    @UseGuards(AuthGuard())
    test(@Req() req){
        console.log(req);
        
    }
}
