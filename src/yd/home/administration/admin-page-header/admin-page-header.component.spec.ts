import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {AdminPageHeaderComponent} from './admin-page-header.component';

describe('AdminPageHeaderComponent', () => {
  let component: AdminPageHeaderComponent;
  let fixture: ComponentFixture<AdminPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageHeaderComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    component.title = 'thePageTitle';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual('thePageTitle');
  });

  it('should display horizontal bar', () => {
    component.title = 'thePageTitle';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-divider')).toBeTruthy();
  });

  it('should have horizontal bar above title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('*')[0].tagName.toLowerCase()).toEqual('h1');
    expect(compiled.querySelectorAll('*')[1].tagName.toLowerCase()).toEqual('mat-divider');
  });
});
