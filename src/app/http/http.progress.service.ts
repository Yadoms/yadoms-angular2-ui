import { Injectable } from '@angular/core';
import { Observable, Subject }  from 'rxjs/Rx';

@Injectable()
export class HttpProgressService {
  public progressEventObservable: Subject<any> = new Subject<any>();

  public onprogress(event: any) {
      console.log('New progress event');
      console.log(event);
      this.progressEventObservable.next(event);
  }
}
