

export class WidgetPackage {
  public type: string;
  public version: string;
  public author: string;
  public credits: string;
  public dependencies: {
    yadoms: {
      minimumVersion: string;
    };
  };
  public dimensions: {
    min: {
      x: number ;
      y: number;
    },
    max: {
      x: number ;
      y: number;
    },
    default: {
      x: number;
      y: number;
    }
  };
}

export class WidgetPackages {
  public package: WidgetPackage[];
}
