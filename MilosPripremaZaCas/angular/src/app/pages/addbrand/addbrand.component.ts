import { Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Router} from '@angular/router';
import { AddBrandService } from "../../services/addbrand.service";
import Brand from "../../model/brand";

@Component({
  selector: 'addcategory',
  templateUrl: `./addbrand.html`
})

export default class AddBrandComponent {

  addBrandForm = new FormGroup({
    ime: new FormControl(),
  });

  constructor( private http: Http,private router: Router, private addBrandService: AddBrandService) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }

  addBrand(brand: Brand) {
    this.addBrandService.callService(brand).subscribe(data => {
      this.router.navigate(['/brands']);
    });

  }

}
