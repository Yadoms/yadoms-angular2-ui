export class Filter {
  public onlyNotValidated: boolean = false;
  public selectedAircrafts: number[];
  public aircraftLoaded: boolean = false;
  public allAircraftsDisplayed: boolean = true;

  public isActive(): boolean {
    return (this.aircraftLoaded && !this.allAircraftsDisplayed) || this.onlyNotValidated;
  }
}
