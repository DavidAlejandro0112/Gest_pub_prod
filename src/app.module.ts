import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { User } from './users/entities/user.entity';
import { PostsModule } from './posts/posts.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService], // Asegúrate de inyectar ConfigService aquí
      useFactory: async (configService: ConfigService) => ({
        type:'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'), 
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        //entities:[User],
        synchronize: true, // Solo en desarrollo; no usar en producción

      }),
      
    }),
    UsersModule,
    PostsModule,
    ProductsModule,
    AuthModule, ],
  
    
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
