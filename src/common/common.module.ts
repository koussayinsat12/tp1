import { Global, Module } from '@nestjs/common';
import { CrudService } from './crud.service';
@Global()
@Module({
  providers: [CrudService],
  exports:[CrudService],
})
export class CommonModule {}
