import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule],
})
export class AppModule {}
