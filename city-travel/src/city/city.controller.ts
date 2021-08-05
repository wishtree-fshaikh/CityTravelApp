import { Body, Controller,Delete,Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/admin/get-user-decorator';
import { Admin } from 'src/admin/interface/admin.interface';
import { CityService } from './city.service';
import { CreateCity } from './dto/create-city-dto';
import { City } from './interface/city.interface';
//---------------Done With Import---------------//

@Controller('city')
export class CityController {

    constructor(private readonly CityService:CityService){}

    @Get()
    findAll(@GetUser() admin:Admin){
        console.log(admin);
        
        return this.CityService.findAll();
    };

    @Get(':id')
    findOne(@Param('id') id):Promise<City>{
        return this.CityService.findOne(id)
    }

    @Post()
    async createCity(@Body() createCity:CreateCity):Promise<City>{
            return this.CityService.createCity(createCity)
    }


    @Delete(':id')
    delete(@Param('id') id):Promise<City>
    {
        return this.CityService.delete(id)
    }

    @Put(':id')
    async update(@Body() updateDto:CreateCity,@Param('id') id){
        return this.CityService.update(id,updateDto)
    }

}
