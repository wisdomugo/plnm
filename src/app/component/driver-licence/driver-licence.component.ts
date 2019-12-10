import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DriverLicenceService } from '../../service/driver-licence.service';

@Component({
  selector: 'app-driver-licence',
  templateUrl: './driver-licence.component.html',
  styleUrls: ['./driver-licence.component.css']
})
export class DriverLicenceComponent implements OnInit {

   // set preview images
   driverLicenceDocPreview: string;

   drivLicenceForm: FormGroup;
   formdata = new FormData();

  constructor(private el: ElementRef, public fb: FormBuilder,
    private router: Router, private dls: DriverLicenceService) { 
      this.createForm();
    }

  ngOnInit() {
  }

  createForm() {
    this.drivLicenceForm = this.fb.group({
      fullName: ['', [Validators.required]],
      stateOrigin: ['', [Validators.required]],
      driverLicenceDoc: [null, [Validators.required]],
      lgaOrigin: ['', [Validators.required]],
      issueDate: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      dateBirth: ['', [Validators.required]],
      bloodGroup: ['', [Validators.required]],
      vehicleCategory: ['', [Validators.required]]
    });

  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    const targ = (event.target as HTMLInputElement).name;

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.driverLicenceDocPreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }

  onSubmit() {
    let fileInputEl: HTMLInputElement = this.el.nativeElement.querySelector('input[type="file"]');
      let fileCount: number = fileInputEl.files.length;
      if (fileCount > 0) {
        this.formdata.append(fileInputEl.name, fileInputEl.files.item(0));
        }
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelectorAll('input[type="text"]', 'input[type="email"]');
    Array.prototype.forEach.call(inputEl, element => {
      this.formdata.append(element.name, element.value);
    });
    if (!this.drivLicenceForm.valid) {
      return false;
    } else {
      this.dls.saveDriverLicence(this.formdata)
       .subscribe(
         (res) => {
         console.log(res);
         this.router.navigate(['applicant-data']);
         },
         (error) => {
           console.log(error);
         }
       );
    }
  }



}
