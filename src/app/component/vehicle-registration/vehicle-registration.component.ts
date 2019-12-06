import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-registration.component.html',
  styleUrls: ['./vehicle-registration.component.css']
})
export class VehicleRegistrationComponent implements OnInit {
  preview: string;
  vehicleForm: FormGroup;
  formdata: FormData;

  constructor(public fb: FormBuilder, private vs: VehicleService) { 
    this.createForm()
  }

  ngOnInit() {
  }

  createForm() {
    this.vehicleForm = this.fb.group({
     fullName: ['', [Validators.required]],
     purchaseReceipt: [null, [Validators.required]],
    });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.vehicleForm.patchValue({
      avatar: file
    });
    this.vehicleForm.get('avatar')
    // .updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }


  onSubmit() {
    this.formdata.set('purchaseReceipt', this.vehicleForm.value);

    if (!this.vehicleForm.valid) {
      return false;
    } else {
      this.vs.registerVehicle(this.formdata)
       .subscribe(
         (res) => {
         console.log('Vehicle successfully registered!');
         console.log(res);
         },
         (error) => {
           console.log(error);
         }
       );
    }
  }

}
