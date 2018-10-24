import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';

import {AboutComponent} from './about.component';

@Component({selector: 'yd-admin-page-header', template: ''})
class YdAdminPageMockComponent {
}

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent, YdAdminPageMockComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header first', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('*')[0].tagName.toLowerCase()).toEqual('yd-admin-page-header');
  });

  it('should display useful links', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('h2')[0].textContent).toEqual('Useful links');
    const linksList = compiled.querySelectorAll('div a');
    console.log('linksList =', linksList);
    expect(Object.keys(linksList).length).toEqual(4);

    expect(linksList[0].href).toEqual('http://www.yadoms.com/');
    expect(linksList[0].target).toEqual('_blank');
    expect(linksList[0].textContent).toEqual('Yadoms web site');

    expect(linksList[1].href).toEqual('https://github.com/Yadoms/yadoms/issues/');
    expect(linksList[1].target).toEqual('_blank');
    expect(linksList[1].textContent).toEqual('Report an issue');

    expect(linksList[2].href).toEqual('https://github.com/Yadoms/yadoms/');
    expect(linksList[2].target).toEqual('_blank');
    expect(linksList[2].textContent).toEqual('Yadoms on Github');

    expect(linksList[3].href).toEqual('http://yadoms.com/forum/');
    expect(linksList[3].target).toEqual('_blank');
    expect(linksList[3].textContent).toEqual('Forum');
  });
});
