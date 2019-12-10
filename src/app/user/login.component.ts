import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginInvalid = false;

  constructor(public fb: FormBuilder,
    private router: Router, private authServ: AuthenticationService) {
      this.createForm();
    }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.authServ.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe(resp => {
      if(!resp){
        this.loginInvalid = true
      } else{
        this.router.navigate(['vehicle/register']);
      }
    });
  }

}
