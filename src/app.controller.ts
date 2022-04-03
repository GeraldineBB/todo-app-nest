import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


//decorateur 
@Controller()
export class AppController {
  // (privé ou non, nom, type)
  constructor(private readonly appService: AppService) {}

  // autre décorateur : get qui permet d'écouter les requêtes entrantes
  // @get permet de décorer notre fonction getHello() qui retourne une string
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
