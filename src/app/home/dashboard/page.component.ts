import { Component, OnInit, Input } from '@angular/core';
import { Page } from '../../core/models/page';

@Component({
    selector: 'page',
    templateUrl: 'page.component.html'
})

export class PageComponent implements OnInit {
    @Input() public data: Page;

    public ngOnInit() {
        // main.js
        const packery = require('packery');

        const pckry = new packery( '.grid', {
        // options
        itemSelector: '.grid-item',
        gutter: 10
        });
     }
}
