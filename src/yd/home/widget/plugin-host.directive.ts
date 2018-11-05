import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPluginHost]'
})
export class PluginHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
