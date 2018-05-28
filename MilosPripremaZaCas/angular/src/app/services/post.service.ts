import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {apiUrl, prepareFormData, defaultPostHeaders, parseErrorToAlert} from "../constants";

@Injectable()
export default class PostService {
  protected url = apiUrl;
  protected headers = defaultPostHeaders;

  constructor (protected http: Http) {}

  callService(item: Object): Observable<void> {
    let data = prepareFormData(item);
    return this.http.post(this.url, data, {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleError);
  }
  protected extractData(res: Response) {
    let obj = JSON.parse(res['_body']);
    return obj;
  }

  protected handleError (error: Response | any) {
    parseErrorToAlert(error);
    return Observable.throw("Error");
  }
}
