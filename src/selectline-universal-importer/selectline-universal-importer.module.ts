import { SelectlineUniversalImporterController } from '@/selectline-universal-importer/controller/selectline-universal-importer.controller';
import { RequestService } from '@/middleware/request.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config/configuration';


@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration],
      }),
      HttpModule,
      ThrottlerModule.forRoot({
        ttl: 60,
        limit: 10,
      }),
      SelectlineUniversalImporterModule,
    ],
    controllers: [SelectlineUniversalImporterController],
    providers: [RequestService],
  })
export class SelectlineUniversalImporterModule {}
