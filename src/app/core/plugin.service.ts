import { Injectable } from '@angular/core';
import {RestServerService} from './restserver.service';
import {AvailablePlugins} from './models/available-plugin';

@Injectable({
  providedIn: 'root'
})
export class PluginService {

  constructor(private restServerService: RestServerService) {
  }

  public getAvailablePluginsPackage(fields: string[]): Promise<AvailablePlugins> {
    //TODO l'envoi d'un PUT est reçu en tant qu'OPTIONS par le serveur
    return this.restServerService.put<AvailablePlugins>('plugin', {'fields': fields});
  }
}
