/*
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation, ViewChild, Input, ComponentRef, Compiler, Injector, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'dcl-wrapper',
  template: `<div #target></div>`
})
export class DclWrapperComponent implements OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('target', {read: ViewContainerRef}) public target;
  @Input() public type;
  private cmpRef: any;
  private isViewInitialized: boolean = false;

  constructor(private resolver: ComponentFactoryResolver, private compiler: Compiler) {}

  public updateComponent() {
    if (!this.isViewInitialized) {
      return;
    }
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    const modulePath = '../widgets/' + this.type + '/' + this.type + '.module.ts';
    // '../widgets/dev-fake-widget/dev-fake-widget.module'
/*
    System.import('../widgets/dev-fake-widget/dev-fake-widget.module')
    .then(lazyModule => {
      for(let l in lazyModule) {
        this.compiler.compileModuleAndAllComponentsAsync(lazyModule[l])
        .then((componentFactories) => {
          const compFactory = componentFactories.componentFactories.find(x=> true);
          this.cmpRef = this.target.createComponent(compFactory, 0);
        });

      }
    });*/
/*
    require.ensure([modulePath], (require) => {
      debugger;
      const lazyModule = require(modulePath);

      for(let l in lazyModule) {
        this.compiler.compileModuleAndAllComponentsAsync(lazyModule[l])
        .then((componentFactories) => {
          const compFactory = componentFactories.componentFactories.find(x=> true);
          this.cmpRef = this.target.createComponent(compFactory, 0);
        });

      }
      });
    */
/*
    require.ensure([modulePath], (require) => {
      const lazyModule = require(modulePath);

      for(let l in lazyModule) {
        this.compiler.compileModuleAndAllComponentsAsync(lazyModule[l])
        .then((componentFactories) => {
          const compFactory = componentFactories.componentFactories.find(x=> true);
          this.cmpRef = this.target.createComponent(compFactory, 0);
        });

      }*/

      /*
      this.compiler.compileModuleAndAllComponentsAsync(lazyModule.DevFakeWidgetModule)
      .then((componentFactories) => {
        const compFactory = componentFactories.componentFactories.find(x=> true);
        self.cmpRef = self.target.createComponent(compFactory, 0);
      });

    });*/
/*
    System.import('../widgets/dev-fake-widget/dev-fake-widget.module.ts')
    .then(m => {
      System.import('../widgets/dev-fake-widget/dev-fake-widget.component.ts')
      .then(a => {
        debugger;
        const b = a.DevFakeWidgetComponent.getWidget();
        // const c = this.injector.get(b);
        const factory = this.resolver.resolveComponentFactory(b);
        this.cmpRef = this.target.createComponent(factory);
      })
      .catch( (r) => {
        debugger;
      });
    })
    .catch( (r) => {
      debugger;
    });
*/
    /* const factory = this.resolver.resolveComponentFactory(Object.create(window[this.type].prototype));
    this.cmpRef = this.target.createComponent(factory);
    */
  }

  public ngOnChanges() {
    this.updateComponent();
  }

  public ngAfterViewInit() {
    this.isViewInitialized = true;
    this.updateComponent();
  }

  public ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}
