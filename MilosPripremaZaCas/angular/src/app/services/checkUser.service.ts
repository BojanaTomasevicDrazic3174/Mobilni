// checkUser.service.ts
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import PostService from './post.service';
import {apiUrl, getAuthHeaders} from '../constants';
import {Observable} from 'rxjs';

@Injectable()
export default class CheckUserService extends PostService {
  url = apiUrl + 'checkUser.php';

  callService(item: Object): Observable<void> {
      // console.log(item);
    this.headers = getAuthHeaders();
    return super.callService(item);
  }
}
