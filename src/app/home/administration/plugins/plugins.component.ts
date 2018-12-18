import {Component, OnInit, ViewChild} from '@angular/core';
import {PluginService} from '../../../core/plugin.service';
import {PluginInstance, PluginInstanceWithState, PluginInstanceFullState, PluginInstanceState} from '../../../core/models/pluginInstances';
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

    this.pluginInstances.filterPredicate = (data: PluginInstanceWithState, filterValue: string) => {
      filterValue = filterValue.trim().toLocaleLowerCase();
      return  data.instance.DisplayName.indexOf(filterValue) !== -1 ||
        data.instance.Type.indexOf(filterValue) !== -1;
    };
  }

  applyFilter(filterValue: string) {
    this.pluginInstances.filter = filterValue;
  }

  getStateIcon(piState: PluginInstanceState) {
    switch (piState) {
      case PluginInstanceState.Error:
        return 'error_outline';
      case PluginInstanceState.Stopped:
        return 'stop';
      case PluginInstanceState.Running:
        return 'play_arrow';
      case PluginInstanceState.Custom:
        return 'info';
      case PluginInstanceState.WaitDebugger:
        return 'bug_report';
      default:
        return 'help_outline';
    }
  }

  getStateLabel(piState: PluginInstanceFullState) {
    try {
      switch (piState.state) {
        //TODO gérer i18n
        case PluginInstanceState.Error:
          return 'Erreur';
        case PluginInstanceState.Stopped:
          return 'Arrêté';
        case PluginInstanceState.Running:
          return 'Démarré';
        case PluginInstanceState.Custom:
          return piState.messageId;
        case PluginInstanceState.WaitDebugger:
          return 'En attente du debugger...';
        default:
          return 'Inconnu';
      }
    } catch (e) {
      console.error('Fail to display state label. piState = ' + piState);
      console.error(e);
      return 'Inconnu';
    }
  }
}
