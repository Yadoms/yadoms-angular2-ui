import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Page } from '../../core/models/page';
import { PageService } from '../../core/pages.service';
import * as Packery from 'packery-rows';
import { WidgetService } from '../../core/widgets.service';
import { Widgets } from '../../core/models/widgets';
import { switchMap } from 'rxjs/operators';
import { Widget } from '../../core/models/widget';

@Component({
    selector: 'app-page',
    templateUrl: 'page.component.html',
    styleUrls: ['./page.component.scss']
})

export class PageComponent implements OnInit {
    @Input() public data: Page;
    public widgets: Widget[] = [];

    constructor(private route: ActivatedRoute, private router: Router, private pageService: PageService,
        private componentFactoryResolver: ComponentFactoryResolver, private widgetService: WidgetService) {
    }

    public ngOnInit() {

        const pckry = new Packery( '.grid', {
            // options
            itemSelector: '.grid-item',
            gutter: 10
        });

        this.initializeComponentFromRoute();
    }

    /**
     * Initialize the component from the route parameters
     * If an 'id' is present in parameters, then use it,
     * Else select the first page
     */
    private initializeComponentFromRoute() {
        this.route
            .paramMap
            .pipe(switchMap((params: ParamMap) => {
                const idFromUrl = params.get('id');
                if (!idFromUrl) {
                    return this.pageService.getFirst();
                } else {
                    return this.pageService.get(+idFromUrl); // convert idFromUrl to number with '+'
                }
            }))
            .subscribe((p: Page) => {
                this.data = p;
                this.initializeWidgets();
            });
    }

    private initializeWidgets() {
        if (this.data && this.data.id) {
            this.widgetService.getForPage(this.data.id)
            .then( (widgets: Widgets) => {
                this.widgets = widgets.widget;
            });
        }
    }
}
