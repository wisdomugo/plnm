import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../service/vehicle.service';
import { DriverLicenceService } from '../../service/driver-licence.service';

@Component({
  selector: 'app-applicant-data',
  templateUrl: './applicant-data.component.html',
  styleUrls: ['./applicant-data.component.css']
})
export class ApplicantDataComponent implements OnInit {
  Vehicle = {};
  DriverLicence = {};
  plateNumber: string;

  constructor(private vs: VehicleService, private dls: DriverLicenceService) {
    this.getVehicle();
    this.getDriverLicence();
    this.generatePlateNumber();
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

  getDriverLicence(){
    this.dls.getDriverLicence('5ded67b38ca5362af8ed4f31')
    .subscribe(
      (res) => {
      console.log(res);
      this.DriverLicence = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  generatePlateNumber(){
    console.log(this.Vehicle.age);
  }

}
