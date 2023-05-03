/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './middleware/SelectlineMiddleware';
import { SelectlineUniversalImporterGuard } from './selectline-universal-importer/guards/selectline-universal-importer.guard';
import { SelectlineUniversalImporterModule } from './selectline-universal-importer/selectline-universal-importer.module';

async function bootstrap() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const fs = require('fs');

  const httpsOptions = {
    key: fs.readFileSync('./src/CA-cert/PrivateKey.pem'),
    cert: fs.readFileSync('./src/CA-cert/EndUserCertificate.pem'),
  };

  const app = await NestFactory.create(SelectlineUniversalImporterModule, {
    httpsOptions: httpsOptions
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new SelectlineUniversalImporterGuard());
  app.init()
  app.enableCors();
  await app.listen(3000, 'slimport.absturzsicherung.de');
  
}
bootstrap();
