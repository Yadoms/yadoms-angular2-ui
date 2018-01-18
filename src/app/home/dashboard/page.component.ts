import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Page } from '../../core/models/page';
import { PageService } from '../../core/pages.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-page',
    templateUrl: 'page.component.html',
    styleUrls: ['./page.component.scss']
})

export class PageComponent implements OnInit {
    @Input() public data: Page;

    constructor(private route: ActivatedRoute, private router: Router, private pageService: PageService, private componentFactoryResolver: ComponentFactoryResolver) {
    }

    public ngOnInit() {
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
            .switchMap((params: ParamMap) => {
                const idFromUrl = params.get('id');
                if (!idFromUrl) {
                    return this.pageService.getFirst();
                } else {
                    return this.pageService.get(+idFromUrl); // convert idFromUrl to number with '+'
                }
            })
            .subscribe((p: Page) => this.data = p);
    }
}
