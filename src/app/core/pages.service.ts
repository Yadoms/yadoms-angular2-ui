import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RestResult } from './rest-result';
import { RestServerService } from './restserver.service';
import { Pages } from './models/pages';

@Injectable()
export class PageService {
    constructor(private restServerService: RestServerService) {
    }

    /**
     * Get all declared pages
     * @returns The page list, through Promise
     */
    public getAll(): Promise<Pages> {
        return this.restServerService.get<Pages>('page');
    }
}
