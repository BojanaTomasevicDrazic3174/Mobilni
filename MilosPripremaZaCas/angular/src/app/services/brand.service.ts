import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { apiUrl, getAuthHeaders } from '../constants';
import Brand from '../model/brand';

@Injectable()
export default class BrandService {
  protected url = apiUrl + 'getBrand.php';

  constructor (protected http: Http) {}

  getBrands(): Observable<Brand[]> {
    return this.http.get(this.url, {headers: getAuthHeaders() })
      .map(this.extractData);
  }
  protected extractData(res: Response) {
    let obj = JSON.parse(res['_body']);
    return obj.brands;
  }

}
