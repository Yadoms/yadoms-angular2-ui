import {Injectable} from '@angular/core';
import {RestServerService} from './restserver.service';
import {AvailablePlugins} from './models/available-plugin';
import {PluginInstance, PluginInstances, PluginInstancesWithState, PluginInstanceWithState} from './models/pluginInstances';

@Injectable({
  providedIn: 'root'
})
export class PluginService {

  constructor(private restServerService: RestServerService) {
  }

  public getAvailablePluginsInformation(fields: string[]): Promise<AvailablePlugins> {
    //TODO l'envoi d'un PUT est reçu en tant qu'OPTIONS par le serveur
    return this.restServerService.put<AvailablePlugins>('plugin', {'fields': fields});
  }

  public getAllPluginsInstance(): Promise<PluginInstances> {
    return new Promise<PluginInstances>((resolve) => {
      this.restServerService.get<PluginInstance[]>('plugin/instance')
        .then((data) => {
          const pi = new PluginInstances();
          pi.plugins = data;
          resolve(pi);
        });
    });
  }

  public getAllPluginsInstanceWithState(): Promise<PluginInstancesWithState> {
    return new Promise<PluginInstancesWithState>((resolve) => {
      this.restServerService.get<PluginInstanceWithState[]>('plugin/instanceWithState')
        .then((data) => {
          const pi = new PluginInstancesWithState();
          pi.instances = data;
          resolve(pi);
        });
    });
  }
}
