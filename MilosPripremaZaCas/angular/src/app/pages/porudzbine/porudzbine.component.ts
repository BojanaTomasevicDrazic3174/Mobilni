// PorudzbineComponent
import { Component} from '@angular/core';
import 'rxjs/Rx';
import GetPorudzbinaService from '../../services/getPorudznine.service';
import { Router} from '@angular/router';
import DeletePorudzbinaService from '../../services/deletePorudzbina.service';


@Component({

  selector: 'porudzbine',
  templateUrl: `./porudzbine.html`,
})

export default class PorudzbineComponent {
  private porudzbine: any = [{}];

  constructor(
  private router: Router,
 private getPorudzbinaService: GetPorudzbinaService,
 private deletePorudzbinaService: DeletePorudzbinaService ) {
   if (!localStorage.getItem('token')) {
     this.router.navigate(['/']);
   }
   let $: any;
   this.getPorudzbinaService.getPorudzbine().subscribe(data => {
    console.log(data);
    this.porudzbine = data;
   setInterval(function(){
      $ = window['jQuery'];
      $('table').DataTable();
    }.bind(this), 400);
   });
  }

  deletePorudzbina(porudzbina: any) {
    let obrisati = {
      ID: porudzbina.ID,
      MOBILNI_ID: porudzbina.MOBILNI_ID
    };
    this.deletePorudzbinaService.callService(obrisati).subscribe(
      res => {
        console.log(res);
if ( res['success']) {
  let index = this.porudzbine.indexOf(porudzbina);
  if (index > -1 ) {
    this.porudzbine.splice(index, 1);
    alert('Uklonili ste proizvod iz porudzbine');
  }
}
    });
  }
}


