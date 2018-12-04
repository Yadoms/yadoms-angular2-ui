import {Component, OnInit, ViewChild} from '@angular/core';
import {PluginService} from '../../../core/plugin.service';
import {PluginInstance} from '../../../core/models/pluginInstances';
import {MatTableDataSource, MatSort, MatSortable} from '@angular/material';


@Component({
  selector: 'yd-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.css']
})

export class PluginsComponent implements OnInit {

  availablePluginInstances: MatTableDataSource<PluginInstance>;
  displayedColumns = ['DisplayName', 'Type'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private pluginService: PluginService) {
    pluginService.getAllPluginsInstance()
      .then(pluginInstances => {
        this.availablePluginInstances = new MatTableDataSource(pluginInstances.plugins);

        this.configureSort();
      });
  }

  private configureSort() {
    // Make Sort insensitive to case
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
