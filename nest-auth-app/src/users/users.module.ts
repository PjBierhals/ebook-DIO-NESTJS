import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { BcryptService } from 'src/auth/hashing/bcryto.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
})
export class UsersModule {}
