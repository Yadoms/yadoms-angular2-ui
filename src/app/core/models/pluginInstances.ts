import {PluginCategory} from './available-plugin';

export enum PluginInstanceState {
  Unknown = 0,
  Error = 1,
  Stopped = 2,
  Running = 3,
  Custom = 4,
  WaitDebugger = 5
}

export class PluginInstanceFullState {
  public state: PluginInstanceState;
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
  public state: PluginInstanceFullState;
}

export class PluginInstancesWithState {
  public instances: PluginInstanceWithState[];
}

