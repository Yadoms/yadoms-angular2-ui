import {Component, OnInit} from '@angular/core';
import {PluginService} from '../../../core/plugin.service';
import {PluginInstances} from '../../../core/models/pluginInstances';


@Component({
  selector: 'yd-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.css']
})

export class PluginsComponent implements OnInit {

  public availablePluginInstances: PluginInstances;
  searchText: string;

  constructor(private pluginService: PluginService) {
    this.pluginService.getAllPluginsInstance()
      .then(pluginInstances => {
        this.availablePluginInstances = pluginInstances;
        });
  }

  ngOnInit() {
  }

}
