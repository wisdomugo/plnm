import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-applicant-data',
  templateUrl: './applicant-data.component.html',
  styleUrls: ['./applicant-data.component.css']
})
export class ApplicantDataComponent implements OnInit {
  Vehicle = {};

  constructor(private vs:VehicleService) {
    this.getVehicle();
   }

  ngOnInit() {
  }

  getVehicle(){
    this.vs.getVehicle('5ded09784433ee249807bc8e')
    .subscribe(
      (res) => {
      console.log(res);
      this.Vehicle = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
