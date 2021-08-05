import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from 'src/admin/admin.module';

import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CitySchema } from './schema/city.schema';
//---------------Done With Import---------------//


@Module({
    imports: [MongooseModule.forFeature([{name:"City" , schema : CitySchema}]),AdminModule],

  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
