import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng';
import { LoginDetails } from '../models/login.model';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  types: SelectItem[];
  username: string;
  password: string;
  type: any;
  loginDetails: LoginDetails;
  message: string;
  toRedirectUrl: string;
  loggedIn: string;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    // this.loginForm = new FormGroup({
    //   username: new FormControl(),
    //   password: new FormControl(),
    //   type: new FormControl()
    // });

    this.route.queryParams.subscribe(params => {
      this.toRedirectUrl = params['redirectURL'] || 0;
    });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      type: ['', Validators.required]
    });

    this.types = [
      {label: 'Select Type', value: 0},
      {label: 'Admin', value: 1},
      {label: 'Employee', value: 2},
    ];

    this.loggedIn = localStorage.getItem('type');

  }

  login() {
    this.loginDetails = new LoginDetails();
    this.loginDetails.username = this.loginForm.get("username").value;
    this.loginDetails.password = this.loginForm.get("password").value;
    this.loginDetails.type = this.loginForm.get("type").value;
    this.loginService.login(this.loginDetails).subscribe(response => {
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {
          if (resObj.message === 'Invalid Credentials') {
            this.message = 'Invalid credentials';
          } else {
            this.message = 'Success';
            this.loginService.setData(resObj.data.role.id);
            if (this.toRedirectUrl.toString() !== '0') {
              this.router.navigate([this.toRedirectUrl]);
            }
          }
      }
    }, error => {
      console.log('error');
      console.log(error);
    });    
  }

  get f() {
    return this.loginForm.controls;
  }

  alreadyLoggedIn () : boolean {
    this.type = localStorage.getItem('type');
    return this.type === '1' || this.type === '2' || this.type === '3';
  }

}
