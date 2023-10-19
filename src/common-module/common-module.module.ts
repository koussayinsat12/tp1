import { Global, Module } from '@nestjs/common';
import { UuidService } from './uuid/uuid.service';
@Global()
@Module({
  providers: [UuidService],
  exports:[UuidService]
})
export class CommonModuleModule {}
