import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../core/widget.service';
import {PluginService} from '../../../core/plugin.service';
import {WidgetPackages} from '../../../core/models/widget.packages';
import {AvailablePlugin} from '../../../core/models/available-plugin';

//TODO appliquer l'i18n

@Component({
  selector: 'yd-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})


export class AboutComponent implements OnInit {

  yadomsDependencies = [
    {
      name: 'Boost',
      url: 'https://www.boost.org/',
      icon: 'assets/img/about/boost-logo.png'
    },
    {
      name: 'Poco',
      url: 'https://www.pocoproject.org/',
      icon: 'assets/img/about/poco-logo.png'
    },
    {
      name: 'Protobuf',
      url: 'https://developers.google.com/protocol-buffers/',
      icon: 'assets/img/about/google-logo.png'
    },
    {
      name: 'Python',
      url: 'https://www.python.org/',
      icon: 'assets/img/about/python-logo.png'
    },
    {
      name: 'Swig',
      url: 'http://www.swig.org/',
      icon: 'assets/img/about/swig-logo.png'
    },
    //TODO compléter la liste avec les libs JS/TS utilisées
  ];

  public yadomsWidgets: WidgetPackages;
  public availablePlugins: AvailablePlugin[];

  constructor(private widgetService: WidgetService, private pluginService: PluginService) {
    this.widgetService.getAllPackages()
      .then((packages: WidgetPackages) => {
        this.yadomsWidgets = packages;
      });
    this.pluginService.getAvailablePluginsPackage(['type', 'author', 'credits'])
      .then((plugins: string[]) => { //TODO voir si on peut retourner un object plutôt qu'un string[][]
        this.availablePlugins = plugins.map((plugin) => {
          return {author: plugin['author'], type: plugin['type'], credits: plugin['credits']};
        });
      });
  }

  ngOnInit() {
  }

}
