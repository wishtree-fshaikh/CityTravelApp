import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Admin } from "./interface/admin.interface";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "jsonwebtoken";
@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel("Admin") private readonly AdminModule:Model<Admin>,


    ){
        super({
            secretOrKey:"secret",
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
        })

    }


    async validate(payload:JwtPayload)
    {
        const {email,name} = payload

        const admin:Admin = await this.AdminModule.findOne({email})

        if(!admin)
        {
            throw new UnauthorizedException("Bad")
        }

        return admin
    }
}