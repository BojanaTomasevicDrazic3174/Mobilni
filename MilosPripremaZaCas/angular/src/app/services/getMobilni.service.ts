// getMobilni.service.ts
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { apiUrl, getAuthHeaders } from '../constants';

import Mobilni from '../model/mobilni';

@Injectable()
export default class GetMobilniService {
  protected url = apiUrl + 'getMobilni.php';

  constructor (protected http: Http) {}

  getMobilni(): Observable<Mobilni[]> {
    return this.http.get(this.url, {headers: getAuthHeaders() })
      .map(this.extractData);
  }
  protected extractData(res: Response) {
    console.log(res);
    let obj = JSON.parse(res['_body']);
    console.log(obj);
    return obj.mobilni;
  }

}
