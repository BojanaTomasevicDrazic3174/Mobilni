import { Component} from '@angular/core';
import 'rxjs/Rx';
import Mobilni from '../../model/mobilni';
import Porudzbina from '../../model/porudzbina';
import GetMobilniService from '../../services/getMobilni.service';
import AddPorudzbinaService from '../../services/addPorudzbina.service';
import { Router} from '@angular/router';
import CheckUserService from '../../services/checkUser.service';
import DeleteMobilniService from '../../services/deleteMobilni.service';

@Component({
  selector: 'mobilni',
  templateUrl: `./mobilni.html`,
})

export default class MobilniComponent {
  public name: string;
 mobilni: Mobilni[];
  public selectedMobilniId: string;
  addPorudzbina: Porudzbina;
  username: string = 'korisnik';

  constructor(private router: Router,
    private getMobilniService: GetMobilniService,
  private addPorudzbinaService: AddPorudzbinaService,
private checkUserService: CheckUserService,
private deleteMobilniService: DeleteMobilniService ) {
if (localStorage.getItem('token') != null) {
  checkUserService.callService({token: localStorage.getItem('token')}).subscribe((res: any) => {
if (res === 'ok' ) {
  this.username = 'admin';
}else {
  this.username = 'korisnik';
}
console.log(this.username);

  });
}
    // let $: any;
    this.getMobilniService.getMobilni().subscribe( data => {
      console.log(data);
      this.mobilni = data;
     /*  setInterval(function(){
        $ = window['jQuery'];
        $('table').DataTable();
      }.bind(this), 400);*/
    });
  }

  odaberiMobilni(mob: any) {
    this.selectedMobilniId = mob;
    console.log(this.selectedMobilniId);
  }

  naruciMobilni() {
    console.log(this.selectedMobilniId);
    this.addPorudzbina = new Porudzbina();
    // tslint:disable-next-line:radix
    this.addPorudzbina.mobilniId = parseInt(this.selectedMobilniId);
    this.addPorudzbinaService.callService(this.addPorudzbina).subscribe(res => {
      if (res['success'] && res['success'] === 'ok') {
        this.addPorudzbina = null;
        this.selectedMobilniId = null;
        alert('Uspesno ste narucili mobilni');
      }
      this.router.navigate(['/porudzbine']);
    });
  }


  deleteMobilni(mobil: any) {
// console.log(mobil);

const obrisati = {
  'ID': mobil.ID
};
console.log(obrisati);

this.deleteMobilniService.callService(obrisati).subscribe(res => {
  if (res['success']) {
    let index = this.mobilni.indexOf(mobil);
    if (index > -1 ) {
      this.mobilni.splice(index, 1);
    }
    alert('Uspesno ste obrisali mobilni');
  }
});



  }

}


