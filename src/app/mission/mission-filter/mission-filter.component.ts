import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mission-filter',
  templateUrl: './mission-filter.component.html',
  styleUrls: ['./mission-filter.component.css']
})
export class MissionFilterComponent {
  @Input() years: string[] = [];
  @Output() filterChanged = new EventEmitter<any>();
  
  selectedYear: string | null = null;
  launchSuccess: boolean | null = null;
  landSuccess: boolean | null = null;

  toggleYear(year: string): void {
    this.selectedYear = this.selectedYear === year ? null : year;
    this.emitFilters();
  }

  setLaunchSuccess(value: boolean): void {
    this.launchSuccess = this.launchSuccess === value ? null : value;
    this.emitFilters();
  }

  setLandSuccess(value: boolean): void {
    this.landSuccess = this.landSuccess === value ? null : value;
    this.emitFilters();
  }

  clearFilters(): void {
    this.selectedYear = null;
    this.launchSuccess = null;
    this.landSuccess = null;
    this.emitFilters();
  }

  private emitFilters(): void {
    this.filterChanged.emit({
      launch_year: this.selectedYear,
      launch_success: this.launchSuccess,
      land_success: this.landSuccess
    });
  }
}