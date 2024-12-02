import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiService } from './Http.service';



@Module({
  imports: [HttpModule],
  providers: [ApiService],
  exports: [ApiService ], 
})
export class ApiModule {}
