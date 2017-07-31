import { Injectable } from '@angular/core';
import { BrowserXhr } from '@angular/http';
import { HttpProgressService } from './http.progress.service';

@Injectable()
export class CustomBrowserXhr extends BrowserXhr {
  constructor(private service: HttpProgressService) {
    super();
  }

  public build(): any {
    let xhr = super.build();
    xhr.onprogress = (event) => {
      this.service.onprogress(event);
    };
    return <any> (xhr);
  }
}
