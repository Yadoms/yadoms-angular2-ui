import { Component, OnInit, Compiler, Injector  } from '@angular/core';
import { ViewContainerRef, ViewChild } from '@angular/core';

import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WidgetFactoryService {
  private injector: Injector;
  private compiler: Compiler;

  constructor(injector: Injector) {
    this.injector = injector; 
    this.compiler = this.injector.get(Compiler);
  }

  public load(href: string, vcr: ViewContainerRef): Promise<AngularCore.ComponentRef<any>> {
    return new Promise<AngularCore.ComponentRef<any>>( (resolve: (value?: AngularCore.ComponentRef<any>) => void, reject: (reason?: any) => void) => {

    fetch(href)
    .then(response => response.text())
    .then(source => {
      const exports = {}; // this will hold module exports
      const modules = {   // this is the list of modules accessible by plugin
        '@angular/core': AngularCore,
        '@angular/common': AngularCommon
      };

      const require = (module) => modules[module]; // shim 'require'
      eval(source); // interpret the plugin source
      const mwcf = this.compiler.compileModuleAndAllComponentsSync(exports['PluginModule']);

      const componentFactory = mwcf.componentFactories.find(e => e.selector === 'yd-plugin-component'); // find the entry component
      if (componentFactory) {
        vcr.clear();
        
        const componentRef = vcr.createComponent(componentFactory);
        resolve(componentRef);
      }
      reject('cannot find factory for yd-plugin-component');
    });
  });
  }  
}
