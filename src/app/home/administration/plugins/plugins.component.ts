import {Component, OnInit, ViewChild} from '@angular/core';
import {PluginService} from '../../../core/plugin.service';
import {PluginInstance, PluginInstanceWithState, PluginState} from '../../../core/models/pluginInstances';
import {MatSort, MatTableDataSource} from '@angular/material';
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

  pluginInstances: MatTableDataSource<PluginInstanceWithState>;
  availablePlugins: AvailablePlugin[];
  displayedColumns = ['State', 'DisplayName', 'Type'];
  expandedPluginInstance: PluginInstance | null;
  @ViewChild(MatSort) sort: MatSort;

  private pluginService: PluginService;

  constructor(pluginService: PluginService) {
    this.pluginService = pluginService;
  }

  ngOnInit() {
    Promise.all([
      this.pluginService.getAllPluginsInstanceWithState(),
      this.pluginService.getAvailablePluginsInformation(null/*TODO*/) // TODO vraiment utile ?
    ])
      .then(value => {
        this.pluginInstances = new MatTableDataSource(value[0].instances);
        this.availablePlugins = value[1].plugins;

        this.configureSort();
      });
  }

  private configureSort() {
    // Make sort insensitive to case
    this.pluginInstances.sortingDataAccessor = ((item: PluginInstanceWithState, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'DisplayName':
          return item.instance.DisplayName.toLocaleLowerCase();
        case 'Type':
          return item.instance.Type.toLocaleLowerCase();
        default:
          return item.instance[sortHeaderId];
      }
    });

    // Apply sort to data
    this.pluginInstances.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.pluginInstances.filter = filterValue.trim().toLowerCase();
  }

  getStateIcon(piState: PluginState) {
    switch (piState) {
      case PluginState.Error: return 'error_outline';
      case PluginState.Stopped: return 'stop';
      case PluginState.Running: return 'play_arrow';
      case PluginState.Custom: return 'info';
      case PluginState.WaitDebugger: return 'bug_report';
      default: return 'help_outline';
    }
  }
}
