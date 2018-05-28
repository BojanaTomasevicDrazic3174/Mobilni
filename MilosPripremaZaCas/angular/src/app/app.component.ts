import { Component } from '@angular/core';
import { Router } from '@angular/router';
import CheckUserByIdService from './services/checkUserById.service';

@Component({
  selector: 'it255-ispit',
  templateUrl: './router.html',
})
export class AppComponent  {

  router: Router;
  isAuth: Boolean;
  isIdOne: Boolean = false;

  constructor(router: Router,
    private checkUserByIdService: CheckUserByIdService) {
    this.router = router;
    this.router.events.subscribe(() => {
      this.isAuth = localStorage.getItem('token') !== null;
      this.checkUserByIdService.callService({token: localStorage.getItem('token')}).subscribe((res: any) => {
        console.log(res);
        if (res && res === 'ok') {
          this.isIdOne = true;
        } else {
          this.isIdOne = false;
        }
      });
    });
  }

  onLogout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['./']);
    this.isAuth = localStorage.getItem('token') !== null;
  }
}
