import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RestResult } from './rest-result';
import { RestServerService } from './restserver.service';
import { Widgets } from './models/widgets';
import { Widget } from './models/widget';
import * as _ from 'lodash';

@Injectable()
export class WidgetService {
    constructor(private restServerService: RestServerService) {
    }

    /**
     * Get all declared pages
     * @returns The page list, through Promise
     */
    public getAll(): Promise<Widgets> {
        return this.restServerService.get<Widgets>('widget');
    }

    /**
     * Get widgets for page
     * @param idPage The page identifier
     * @returns The page list, through Promise
     */
    public getForPage(idPage: number): Promise<Widgets> {
        return this.restServerService.get<Widgets>('page/' + idPage + '/widget');
    }
}
