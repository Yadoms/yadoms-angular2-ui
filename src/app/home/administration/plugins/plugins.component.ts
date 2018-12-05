import {Component, OnInit, ViewChild} from '@angular/core';
import {PluginService} from '../../../core/plugin.service';
import {PluginInstance} from '../../../core/models/pluginInstances';
import {MatTableDataSource, MatSort} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AvailablePlugin} from '../../../core/models/available-plugin';


@Component({
  selector: 'yd-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PluginsComponent implements OnInit {

  pluginInstances: MatTableDataSource<PluginInstance>;
  availablePlugins: AvailablePlugin[];
  displayedColumns = ['DisplayName', 'Type'];
  expandedPluginInstance: PluginInstance | null;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private pluginService: PluginService) {
    const p1 = pluginService.getAllPluginsInstance();
    const p2 = pluginService.getAvailablePluginsPackage(null/*TODO*/);
    Promise.all([p1, p2])
      .then(value => {
        this.pluginInstances = new MatTableDataSource(value[0].plugins);
        this.availablePlugins = value[1].plugins;

        this.configureSort();
      });
  }

  private configureSort() {
    // Make sort insensitive to case
    this.pluginInstances.sortingDataAccessor = ((item: PluginInstance, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'DisplayName':
          return item.DisplayName.toLocaleLowerCase();
        case 'Type':
          return item.Type.toLocaleLowerCase();
        default:
          return item[sortHeaderId];
      }
    });

    // Apply sort to data
    this.pluginInstances.sort = this.sort;
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.pluginInstances.filter = filterValue.trim().toLowerCase();
  }

  getPlugin(pi: PluginInstance) {
    return null; //TODO récupérer l'image du plugin
  }
}
