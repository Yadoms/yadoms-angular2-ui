import {Component, OnInit, ViewChild} from '@angular/core';
import {PluginService} from '../../../core/plugin.service';
import {PluginInstance} from '../../../core/models/pluginInstances';
import {MatTableDataSource, MatSort} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';


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

  availablePluginInstances: MatTableDataSource<PluginInstance>;
  displayedColumns = ['DisplayName', 'Type'];
  expandedPluginInstance: PluginInstance | null;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private pluginService: PluginService) {
    pluginService.getAllPluginsInstance()
      .then(pluginInstances => {
        this.availablePluginInstances = new MatTableDataSource(pluginInstances.plugins);

        this.configureSort();
      });
  }

  private configureSort() {
    // Make sort insensitive to case
    this.availablePluginInstances.sortingDataAccessor = ((item: PluginInstance, sortHeaderId: string) => {
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
    this.availablePluginInstances.sort = this.sort;
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.availablePluginInstances.filter = filterValue.trim().toLowerCase();
  }
}
