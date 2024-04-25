import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import {
  PrometheusModule,
  makeCounterProvider,
  makeHistogramProvider,
} from 'nestjs-prometheus';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    PrismaModule,
    TasksModule,
    UsersModule,
    AuthModule,
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  providers: [
    JwtService,
    makeHistogramProvider({
      name: 'histograme',
      help: 'histograme_help',
    }),
    makeCounterProvider({
      name: 'counter',
      help: 'counter_help',
    }),
  ],
  controllers: [AuthController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
