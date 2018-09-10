import { Component, OnInit, Compiler, Injector } from '@angular/core';
import { ViewContainerRef, ViewChild } from '@angular/core';

import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import { Injectable } from '@angular/core';

export interface PluginDefinition {
  name: string;
  module: string;
  componentSelector: string;
}

@Injectable({
  providedIn: 'root'
})
export class WidgetFactoryService {
  private injector: Injector;
  private compiler: Compiler;

  private widgetBasePath = "assets/widgets/";

  constructor(injector: Injector) {
    this.injector = injector;
    this.compiler = this.injector.get(Compiler);
  }

  public load(pluginDef: PluginDefinition, componentHostView: ViewContainerRef): Promise<AngularCore.ComponentRef<any>> {
    return new Promise<AngularCore.ComponentRef<any>>((resolve: (value?: AngularCore.ComponentRef<any>) => void, reject: (reason?: any) => void) => {

      const href = this.widgetBasePath + pluginDef.name + "/" + pluginDef.name + ".js";

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
          const mwcf = this.compiler.compileModuleAndAllComponentsSync(exports[pluginDef.module]);

          const componentFactory = mwcf.componentFactories.find(e => e.selector === pluginDef.componentSelector); // find the entry component
          if (componentFactory) {
            componentHostView.clear();

            const componentRef = componentHostView.createComponent(componentFactory);
            resolve(componentRef);
          }
          reject('cannot find factory for app-plugin-component');
        });
    });
  }
}
