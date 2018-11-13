
export class SystemInformation {
  public runningPlatform: string;
  public yadoms: {
    version: string;
  };
  public startupTime: Date;
  public executablePath: string;
  public serverReady: boolean;
  public developerMode?: boolean;
}
