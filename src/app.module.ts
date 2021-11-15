/* eslint-disable prettier/prettier */
import { Module,NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckJWT,CheckAdminUser } from './auth/middlewares/auth.middleware';
import { InventoryModule } from './inventory/inventory.module';

const db_uri = process.env.NODE_ENV === 'development' ? 'mongodb://localhost:27017/favourinventory' : process.env.DB
@Module({
  imports: [AuthModule, UserModule,MongooseModule.forRoot(db_uri), InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckJWT).forRoutes('user','/inventory/all','/inventory/:id/add','/inventory/:id/view');
    consumer.apply(CheckJWT,CheckAdminUser).forRoutes({path:'/inventory/new',method:RequestMethod.POST},{path:'/inventory/:id',method:RequestMethod.PUT},{path:'/inventory/:id',method:RequestMethod.DELETE})
  }
}
