import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {RestResult} from './rest-result';
import {RestServerService} from './restserver.service';
import {Widgets} from './models/widgets';
import {Widget} from './models/widget';
import * as _ from 'lodash';
import {WidgetPackages} from './models/widget.packages';

@Injectable()
export class WidgetService {
  constructor(private restServerService: RestServerService) {
  }

  public getAll(): Promise<Widgets> {
    return this.restServerService.get<Widgets>('widget');
  }

  public getAllPackages(): Promise<WidgetPackages> {
    return this.restServerService.get<WidgetPackages>('widget/package');
  }

  public getForPage(idPage: number): Promise<Widgets> {
    return this.restServerService.get<Widgets>('page/' + idPage + '/widget');
  }
}
