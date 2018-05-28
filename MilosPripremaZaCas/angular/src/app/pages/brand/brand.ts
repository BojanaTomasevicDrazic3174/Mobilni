import { Component} from '@angular/core';
import 'rxjs/Rx';
import Brand from '../../model/brand';
import BrandService from '../../services/brand.service';

@Component({
  selector: 'brands',
  templateUrl: `./brand.html`,
})

export default class BrandsComponent {

  brands: Brand[];

  constructor( private brandService : BrandService ) {
    let $: any;
    this.brandService.getBrands().subscribe(data => {
      console.log(data);
      this.brands = data;
      setInterval(function(){
        $ = window['jQuery'];
        $('table').DataTable();
      }.bind(this), 400);
    });
  }


}
