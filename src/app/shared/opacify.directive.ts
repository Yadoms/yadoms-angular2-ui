import { Directive, ElementRef, HostListener, Input, Renderer, trigger,
         state, style, transition, animate } from '@angular/core';
@Directive({
  selector: '[opacify]'
})
export class OpacifyDirective {
  public mouseOverState: string = 'out';

  constructor(private el: ElementRef, private renderer: Renderer) {
  }

  @HostListener('mouseenter') public onMouseEnter() {
    this.mouseOverState = 'in';
  }

  @HostListener('mouseleave') public onMouseLeave() {
    this.mouseOverState = 'out';
  }
}
