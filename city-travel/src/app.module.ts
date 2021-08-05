import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityController } from './city/city.controller';
import { CityModule } from './city/city.module';
import { CityService } from './city/city.service';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [CityModule,MongooseModule.forRoot("mongodb://localhost:27017/City"), AdminModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
