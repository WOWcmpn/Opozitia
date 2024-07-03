import { IsOptional, IsString } from 'class-validator';

export class UpdateDaysEvent {
  @IsString()
  title: string;

  @IsOptional()
  viewDate: string;
}
