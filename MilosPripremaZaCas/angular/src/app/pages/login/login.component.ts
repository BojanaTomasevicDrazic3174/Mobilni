import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import {Router} from '@angular/router';
import {LoginService} from "../../services/login.service";
import User from "../../model/user";

@Component({
  selector: 'login',
  templateUrl: './login.html'
})

export default class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });


  constructor(private http: Http, private router: Router,private loginService: LoginService) {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['']);
    }
  }

  login(login: User): void {
    this.loginService.callService(login).subscribe(data => {
      localStorage.setItem('token', data['token']);
      this.router.navigate(['/']);
    });
  }
}
