import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {RouterModule, Router, ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-registration.component.html',
  styleUrls: ['./vehicle-registration.component.css']
})
export class VehicleRegistrationComponent implements OnInit {

  // userid = this.getUserId();
  userid: string;
  
  // set preview images
  purchaseReceiptPreview: string;
  proofOfOwnershipPreview: string;
  meansOfIdentificationPreview: string;
  passportPreview: string;
  customPapersPreview: string;
  insurancePapersPreview: string;
  vehicleImagePreview: string;


  vehicleForm: FormGroup;
  formdata = new FormData();


  constructor(private el: ElementRef, public fb: FormBuilder,
    private router: Router, private vs: VehicleService, private actRoute: ActivatedRoute) {
    this.createForm();
    this.getUserId();
  }

  ngOnInit() { }

  getUserId() {
    this.actRoute.queryParams.subscribe(params => {
      this.userid = params.userid;
      // return userid;
    });
  }

  createForm() {
    this.vehicleForm = this.fb.group({
     fullName: ['', [Validators.required]],
     purchaseReceipt: [null, [Validators.required]],
     proofOfOwnership: [null, [Validators.required]],
     meansOfIdentification: [null, [Validators.required]],
     passport: [null, [Validators.required]],
     customPapers: [null, [Validators.required]],
     insurancePapers: [null, [Validators.required]],
     vehicleImage: [null, [Validators.required]],
     vehicleEngineNumber: [null, [Validators.required]],
     state: ['', [Validators.required]],
     lga: ['', [Validators.required]],
     age: ['', [Validators.required]]
    });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    const targ = (event.target as HTMLInputElement).name;

    /*this.vehicleForm.patchValue({
      'purchaseReceipt': file
    });
    this.vehicleForm.get('purchaseReceipt').setValue(file)*/
    // .updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    switch (targ) {
      case 'purchaseReceipt':
      reader.onload = () => {
        this.purchaseReceiptPreview = reader.result as string;
      }
      reader.readAsDataURL(file);
      break;

      case 'proofOfOwnership':
      reader.onload = () => {
        this.proofOfOwnershipPreview = reader.result as string;
      }
      reader.readAsDataURL(file);
      break;

      case 'meansOfIdentification':
      reader.onload = () => {
        this.meansOfIdentificationPreview = reader.result as string;
      }
      reader.readAsDataURL(file);
      break;

      case 'passport':
      reader.onload = () => {
        this.passportPreview = reader.result as string;
      }
      reader.readAsDataURL(file);
      break;

      case 'customPapers':
      reader.onload = () => {
        this.customPapersPreview = reader.result as string;
      }
      reader.readAsDataURL(file);
      break;

      case 'insurancePapers':
        reader.onload = () => {
          this.insurancePapersPreview = reader.result as string;
        }
        reader.readAsDataURL(file);
        break;

        case 'vehicleImage':
        reader.onload = () => {
          this.vehicleImagePreview = reader.result as string;
        }
        reader.readAsDataURL(file);
        break;
    }

  }


  onSubmit() {
    let fileInputEl: HTMLInputElement = this.el.nativeElement.querySelectorAll('input[type="file"]');
    Array.prototype.forEach.call(fileInputEl, element => {
      let fileCount: number = element.files.length;
      if (fileCount > 0) {
        this.formdata.append(element.name, element.files.item(0));
        }
    })
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelectorAll('input[type="text"]', 'input[type="email"]');
    Array.prototype.forEach.call(inputEl, element => {
      this.formdata.append(element.name, element.value);
    });
    this.formdata.append('user', this.userid)
          /* for (var value of this.formdata.entries()) {
            console.log(value); 
          }*/
    if (!this.vehicleForm.valid) {
      return false;
    } else {
      this.vs.registerVehicle(this.formdata)
       .subscribe(
         (res) => {
         console.log(res);
         this.router.navigate(['apply/driver-licence'], {queryParams: {userid: this.userid}});
         },
         (error) => {
           console.log(error);
         }
       );
    }
  }



}
