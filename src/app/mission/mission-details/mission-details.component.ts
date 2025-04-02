import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpaceXService } from '../../services/spacex.service';
import { Mission } from '../mission';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css']
})
export class MissionDetailsComponent implements OnInit {
  mission?: Mission;
  showRocketInfo: boolean = false;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private spaceXService: SpaceXService
  ) { }

  ngOnInit(): void {
    const flightNumber = Number(this.route.snapshot.paramMap.get('flight_number'));
    this.spaceXService.getMissionByFlightNumber(flightNumber).subscribe({
      next: (mission) => {
        this.mission = mission;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading mission details:', err);
        this.isLoading = false;
      }
    });
  }

  toggleRocketInfo(): void {
    this.showRocketInfo = !this.showRocketInfo;
  }

  get safeLinks() {
    return this.mission?.links ?? {
      mission_patch_small: undefined,
      article_link: undefined,
      wikipedia: undefined,
      video_link: undefined
    };
  }
}