import { Module } from '@nestjs/common';
import { DaysEventController } from './controller/days-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DaysEventEntity } from './domain/daysEvent.entity';
import { DaysEventQueryRepository } from './repositories/daysEvent.query-repository';
import { DaysEventRepository } from './repositories/daysEvent.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DaysEventEntity])],
  controllers: [DaysEventController],
  providers: [DaysEventQueryRepository, DaysEventRepository],
})
export class DaysEventModule {}
