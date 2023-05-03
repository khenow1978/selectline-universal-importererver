// import { HttpModule, HttpService } from '@nestjs/axios';
// import { Module } from '@nestjs/common';
// import { ThrottlerModule } from '@nestjs/throttler';
// import { AppController } from './app.controller';
// import { RequestService } from './middleware/request.service';
// import { SelectlineUniversalImporterModule } from './selectline-universal-importer/selectline-universal-importer.module';

// @Module({
//   imports: [
//     HttpModule,
//     ThrottlerModule.forRoot({
//       ttl: 60,
//       limit: 10,
//     }),
//     SelectlineUniversalImporterModule,
//   ],
//   controllers: [AppController],
//   providers: [RequestService],
// })
// export class AppModule {}
