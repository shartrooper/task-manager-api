import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URI'),
        connectionFactory: (connection) => {
          const logger = new Logger('MongooseModule');
          logger.log('Database connection was successful!');
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    TasksModule,
  ],
})
export class AppModule {}
