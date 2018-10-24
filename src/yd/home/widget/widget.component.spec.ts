import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WidgetComponent} from './widget.component';

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: ComponentFixture<WidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
    component.configuration = {
      title: 'widgetTitle',
      type: 'widgetType',
      configuration:
        {
          param1: 'param1Value',
          param2: 'param2Value'
        }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('p')[0].textContent).toEqual('widgetTitle');
  });

  it('should display type', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('p')[1].textContent).toEqual('widgetType');
  });

  it('should display config', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('p')[2].textContent).toEqual('{"param1":"param1Value","param2":"param2Value"}');
  });
});
