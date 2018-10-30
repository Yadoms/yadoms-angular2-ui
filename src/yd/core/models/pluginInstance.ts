import {PluginCategory} from './available-plugin';

export class PluginInstance {
  public id: number;
  public displayName: string;
  public type: string;
  public autostart: boolean;
  public category: PluginCategory;
  public configuration: {};
}
