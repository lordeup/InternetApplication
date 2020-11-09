import { Directive, Input, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MatGridList } from "@angular/material/grid-list";

export interface GridColumns {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

@Directive({
  selector: "[appGridCols]"
})
export class GridColsDirective implements OnInit {
  private appGridCols: GridColumns = {xs: 1, sm: 2, md: 4, lg: 6, xl: 8};

  get cols(): GridColumns {
    return this.appGridCols;
  }

  @Input("appGridCols")
  set cols(map: GridColumns) {
    if (map && ("object" === (typeof map))) {
      this.appGridCols = map;
    }
  }

  constructor(
    private grid: MatGridList,
    private breakpointObserver: BreakpointObserver
  ) {
    if (this.grid != null) {
      this.grid.cols = this.appGridCols.md;
    }
  }

  ngOnInit(): void {
    if (this.grid != null) {
      this.grid.cols = this.appGridCols.md;
    }
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {

      if (result.breakpoints[Breakpoints.XSmall]) {
        this.grid.cols = this.appGridCols.xs;
      }
      if (result.breakpoints[Breakpoints.Small]) {
        this.grid.cols = this.appGridCols.sm;
      }
      if (result.breakpoints[Breakpoints.Medium]) {
        this.grid.cols = this.appGridCols.md;
      }
      if (result.breakpoints[Breakpoints.Large]) {
        this.grid.cols = this.appGridCols.lg;
      }
      if (result.breakpoints[Breakpoints.XLarge]) {
        this.grid.cols = this.appGridCols.xl;
      }
    });
  }
}
