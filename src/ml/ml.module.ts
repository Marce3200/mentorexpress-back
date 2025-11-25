import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MlClientService } from './ml-client.service.js';

@Module({
  imports: [ConfigModule],
  providers: [MlClientService],
  exports: [MlClientService],
})
export class MlModule {}
