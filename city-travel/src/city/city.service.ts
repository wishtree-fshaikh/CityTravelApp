import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetUser } from 'src/admin/get-user-decorator';
import { Admin } from 'src/admin/interface/admin.interface';
import { City } from './interface/city.interface';

@Injectable()
export class CityService {
    
    constructor (@InjectModel("City") private readonly CityModule:Model<City>){}

    async createCity(city:City){
        const newCity = new this.CityModule(city)

        return await newCity.save();
    }


    async findOne(id:string):Promise<City>{
        return await this.CityModule.findById({_id:id})
    }


    async findAll():Promise<City[]>{
        return await this.CityModule.find();
    }


    async delete(id:string):Promise<City>{
        return await this.CityModule.findByIdAndDelete({_id:id})
    }

    async update(id:string,city:City):Promise<City>{
        return this.CityModule.findByIdAndUpdate(id,city,{new:true})

    }
}
