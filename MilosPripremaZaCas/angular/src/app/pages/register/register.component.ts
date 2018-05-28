import { Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Router} from '@angular/router';
import {RegisterService} from "../../services/register.service";
import User from "../../model/user";

@Component({
  selector: 'register',
  templateUrl: `./register.html`,
})

export default class RegisterComponent {

  registerForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl()
  });

  constructor( private http: Http,private router: Router,private registerService: RegisterService) {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/']);
    }
  }

  onRegister(model: User) {
    this.registerService.callService(model).subscribe(data => {
      localStorage.setItem('token', data['token']);
      this.router.navigate(['/']);
    });

  }

}
