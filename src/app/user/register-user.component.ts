import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styles: []
})

export class RegisterUserComponent implements OnInit {

  userForm: FormGroup;
  formdata = new FormData();

  constructor(private el: ElementRef, public fb: FormBuilder,
    private router: Router, private authServ: AuthenticationService ) {
      this.createForm();
    }

  ngOnInit() {
  }

  createForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return false;
    } else {
      this.authServ.registerUser(this.userForm.value)
       .subscribe(
         (res) => {
         console.log(res['result']._id);
         // this.authServ.login(res.email, res.password);
         this.router.navigate(['vehicle/register'], {queryParams: {userid: res['result']._id}});
         },
         (error) => {
           console.log(error);
         }
       );
    }
  }


}
