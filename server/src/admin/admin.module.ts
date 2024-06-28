import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import AdminUser from 'nestjs-admin/dist/src/adminUser/adminUser.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  controllers: [AdminController],
  providers: [],
})
export class AdminModule {}
