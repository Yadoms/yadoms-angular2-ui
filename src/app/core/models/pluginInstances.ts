import {PluginCategory} from './available-plugin';

export class PluginInstance {
  public Id: number;
  public DisplayName: string;
  public Type: string;
  public Configuration: object;
  public AutoStart: boolean;
  public Category: PluginCategory;
}

export class PluginInstances {
  public plugins: PluginInstance[];
}
