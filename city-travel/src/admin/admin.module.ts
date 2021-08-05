import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './schema/admin.schema';
import { AdminService } from './admin.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
//---------------Done With Import---------------//


@Module({
  imports: [PassportModule.register({defaultStrategy:"jwt"}),
  JwtModule.register({
    secret:"secret",
    signOptions:{
    }
  }),
    MongooseModule.forFeature([{name:"Admin" , schema : AdminSchema}])],

  controllers: [AdminController],
  providers: [AdminService,JwtStrategy],
  exports:[JwtStrategy,PassportModule]

})
export class AdminModule {}
