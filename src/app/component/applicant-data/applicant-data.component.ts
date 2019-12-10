import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../service/vehicle.service';
import { DriverLicenceService } from '../../service/driver-licence.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicant-data',
  templateUrl: './applicant-data.component.html',
  styleUrls: ['./applicant-data.component.css']
})
export class ApplicantDataComponent implements OnInit {
   
   userid: string;

  Vehicle = {};
  DriverLicence = {};
  plateNumber: string;

  constructor(private vs: VehicleService, private dls: DriverLicenceService, 
    private actRoute: ActivatedRoute) {
      this.getUserId();
    this.getVehicle();
    this.getDriverLicence();
    
   }

  ngOnInit() {
  }

  getUserId() {
    this.actRoute.queryParams.subscribe(params => {
      this.userid = params.userid;
      // return userid;
    });
  }

  getVehicle(){
    this.vs.getVehicle(this.userid)
    .subscribe(
      (res) => {
      console.log(res);
      this.Vehicle = res[0];
      //console.log(this.Vehicle);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDriverLicence(){
    this.dls.getDriverLicence(this.userid)
    .subscribe(
      (res) => {
      console.log(res);
      this.DriverLicence = res[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
