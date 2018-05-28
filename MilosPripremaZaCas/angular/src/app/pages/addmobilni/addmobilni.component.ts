import { Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Router} from '@angular/router';
import BrandService  from '../../services/brand.service';
import Brand from '../../model/brand';
import Mobilni from '../../model/mobilni';
import AddMobilniService from '../../services/addmobilni.service';

@Component({
  selector: 'addmobilni',
  templateUrl: `./addmobilni.html`
})

export default class AddMobilniComponent {
mobilni: Mobilni;
brands: Brand[] = [];

  addMobilniForm = new FormGroup({
    ime: new FormControl(),
    cena: new FormControl(),
    opis: new FormControl(),
    brand_id: new FormControl(),
  });

  constructor( private http: Http,
                private router: Router,
                 private brandService: BrandService,
                private addMobilniService: AddMobilniService ) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }

    this.getAllbrands();
  }

        getAllbrands(): void {
            this.brandService.getBrands().subscribe( data => {
                console.log(data);
                this.brands = data;

                if (this.brands[0]['ID']) {
                  this.addMobilniForm.controls['brand_id'].setValue(this.brands[0]['ID']);
                }
            });

  }

  addMobilni(mobilni: Mobilni) {
    this.addMobilniService.callService(mobilni).subscribe(data => {
        if (data['success'] && data['success'] === 'ok') {
            this.addMobilniForm.reset();
            alert('Uspesno ste dodali novi mobilni');
        }
      this.router.navigate(['/mobilni']);
    });

  }

}
