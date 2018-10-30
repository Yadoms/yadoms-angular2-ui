import { Injectable } from '@angular/core';
import {RestServerService} from './restserver.service';

@Injectable({
  providedIn: 'root'
})
export class PluginService {

  constructor(private restServerService: RestServerService) {
  }

  public getAvailablePluginsPackage(fields: string[]): Promise<string[]> {
    //TODO l'envoi d'un PUT est reçu en tant qu'OPTIONS par le serveur
    return this.restServerService.put<string[]>('plugin', {'fields': fields});
  }
}
