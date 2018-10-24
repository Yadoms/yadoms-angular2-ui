import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminPageHeaderComponent} from './admin-page-header.component';

describe('AdminPageHeaderComponent', () => {
  let component: AdminPageHeaderComponent;
  let fixture: ComponentFixture<AdminPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageHeaderComponent]
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
    expect(compiled.querySelector('p').textContent).toEqual('thePageTitle');
  });

  it('should display horizontal bar', () => {
    component.title = 'thePageTitle';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('hr')).toBeTruthy();
  });

  it('should have horizontal bar above title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('*')[0].tagName.toLowerCase()).toEqual('p');
    expect(compiled.querySelectorAll('*')[1].tagName.toLowerCase()).toEqual('hr');
  });
});
