import { Controller, Get } from '@nestjs/common';
import { UuidService } from 'src/common-module/uuid/uuid.service';

@Controller('test')
export class TestController {
    constructor(private readonly uuidService:UuidService){
      
    }
    @Get()
    getUuid(): string {
      return this.uuidService.generateUuid();
    }


}
