import {Pipe, PipeTransform} from '@angular/core';
import {PluginInstance} from '../core/models/pluginInstances';

@Pipe({
  name: 'pluginInstancesFilter'
})

export class PluginInstancesFilterPipe implements PipeTransform {

  transform(instances: PluginInstance[], searchText: string): PluginInstance[] {

    if (!instances) {
      return [];
    }

    if (!searchText) {
      return instances;
    }

    searchText = searchText.toLowerCase();
    return instances.filter(it => {
      return it.DisplayName.toLowerCase().includes(searchText);
    });
  }

}
