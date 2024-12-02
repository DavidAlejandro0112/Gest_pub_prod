import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  @Cron('*/1 * * * *') 
  handleCron() {
    console.log('Tarea programada ejecutada cada minuto.');
  }
}
