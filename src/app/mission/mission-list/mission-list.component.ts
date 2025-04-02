import { Component, OnInit } from '@angular/core';
import { SpaceXService } from '../../services/spacex.service';
import { Mission } from '../mission';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css']
})
export class MissionListComponent implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];
  years: string[] = [];
  selectedYear: string = '';
  isLoading: boolean = true;

  constructor(private spaceXService: SpaceXService) { }

  ngOnInit(): void {
    this.loadAllMissions();
    this.generateYearOptions();
  }

  loadAllMissions(): void {
    this.spaceXService.getAllMissions().subscribe({
      next: (missions) => {
        this.missions = missions;
        this.filteredMissions = [...missions];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading missions:', err);
        this.isLoading = false;
      }
    });
  }

  generateYearOptions(): void {
    const currentYear = new Date().getFullYear();
    for (let year = 2006; year <= currentYear; year++) {
      this.years.push(year.toString());
    }
  }

  onFilterChange(filters: any): void {
    this.isLoading = true;
    this.spaceXService.getFilteredMissions(filters).subscribe({
      next: (missions) => {
        this.filteredMissions = missions;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error filtering missions:', err);
        this.isLoading = false;
      }
    });
  }

  getSafeLinks(mission: Mission) {
    return mission.links ?? {
      mission_patch_small: undefined,
      article_link: undefined,
      wikipedia: undefined,
      video_link: undefined
    };
  }
}