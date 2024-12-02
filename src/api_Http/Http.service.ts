import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async fetchData(): Promise<any> {
    const response = await firstValueFrom(this.httpService.get('https://api.com/data'));
    return response.data;
  }
  async postData(url: string, data: any): Promise<any> {
    const response = await firstValueFrom(this.httpService.post(url, data));
    return response.data;
  }
}
