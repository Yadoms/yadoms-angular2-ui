import {Component, OnInit} from '@angular/core';
import {PluginService} from '../../../core/plugin.service';
import {PluginInstance} from '../../../core/models/pluginInstances';
import {MatTableDataSource} from '@angular/material';


@Component({
  selector: 'yd-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.css']
})

export class PluginsComponent implements OnInit {

  availablePluginInstances: MatTableDataSource<PluginInstance>;
  displayedColumns = [];
  columnNames = [{
    id: 'DisplayName',
    value: 'Plugin'
  },
    {
      id: 'Type',
      value: 'Type de plugin'
    },
    {
      id: 'AutoStart',
      value: 'Démarrage automatique'
    }];

  constructor(private pluginService: PluginService) {
    pluginService.getAllPluginsInstance()
      .then(pluginInstances => {
        this.availablePluginInstances = new MatTableDataSource(pluginInstances.plugins);
      });
  }

  ngOnInit() {
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

  applyFilter(filterValue: string) {
    this.availablePluginInstances.filter = filterValue.trim().toLowerCase();
  }
}
