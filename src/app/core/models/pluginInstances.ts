import {PluginCategory} from './available-plugin';

export enum PluginState {
  Unknown = 0,
  Error = 1,
  Stopped = 2,
  Running = 3,
  Custom = 4,
  WaitDebugger = 5
}

class PluginsInstanceFullState {
  public state: PluginState;
  public messageId: string;
  public messageData: string;
}

export class PluginInstance {
  public Id: number;
  public DisplayName: string;
  public Type: string;
  public Configuration: object;
  public AutoStart: boolean;
  public Category: PluginCategory;
}

export class PluginInstances {
  public plugins: PluginInstance[];//TODO renommer si possible (en instances)
}

export class PluginInstanceWithState {
  public instance: PluginInstance;
  public state: PluginsInstanceFullState;
}

export class PluginInstancesWithState {
  public instances: PluginInstanceWithState[];
}

