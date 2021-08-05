import { BadRequestException, Body, Injectable, NotFoundException, Param, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './interface/admin.interface';
import { Model } from 'mongoose';
import { AuthAdmin } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
const bcrypt = require("bcrypt")
//---------------Done With Import---------------//


@Injectable()
export class AdminService {
    constructor (@InjectModel("Admin") private readonly AdminModule:Model<Admin>,
    private jwtservice:JwtService){}

    

    async createAdmin(admin:Admin){
         
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(admin.password, salt);


        const newAdmin = new this.AdminModule()
        newAdmin.name= admin.name
        newAdmin.email=admin.email
        newAdmin.password=hash

        return await newAdmin.save();

    }

    async findOne(id:string):Promise<Admin>{
        return await this.AdminModule.findById({_id:id})
    }

    async findOneAdmin(email:string){
        return this.AdminModule.findOne({email:email})
    }


    // async ValidateAdmin(email:string , password:string){
    //     const adminn = await this.findOneAdmin(email)
    //     const name = adminn.name
    //     console.log(name);
        
    //     if(!adminn)
    //     {
    //         throw new NotFoundException("not found")
    //     }
    //     console.log(adminn);

    //     const  bc = await bcrypt.compare(password,adminn.password)
    //    if(!bc)
    //    {
    //        console.log(bc);
           
    //        throw new BadRequestException("sd")
    //    }

    //     const payLoad = {email,name};
    //     console.log("pay",payLoad);
        
    //     const accesstoken : string = await this.jwtservice.sign(payLoad)
    //     console.log(accesstoken);
        
    //      return accesstoken
       
   

    
    // }

}


