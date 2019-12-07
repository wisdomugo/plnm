import { Component, OnInit, ElementRef, Input } from '@angular/core';
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
  formdata = new FormData();


  constructor(private el: ElementRef, public fb: FormBuilder, private vs: VehicleService) { 
    this.createForm();
  }

  ngOnInit() { }

  createForm() {
    this.vehicleForm = this.fb.group({
     fullName: ['', [Validators.required]],
     purchaseReceipt: [null, [Validators.required]],
    });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    /*this.vehicleForm.patchValue({
      'purchaseReceipt': file
    });
    this.vehicleForm.get('purchaseReceipt').setValue(file)*/
    // .updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }


  onSubmit() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#purch');
    let fileCount: number = inputEl.files.length;

    /*console.log(fileCount);
    return;*/

    if (fileCount > 0) {
    this.formdata.append('purchaseReceipt', inputEl.files.item(0));
    }
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
