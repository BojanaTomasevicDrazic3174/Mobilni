// checkUserById.service.ts
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import PostService from './post.service';
import { apiUrl, getAuthHeaders } from '../constants';
import { Observable } from 'rxjs';

@Injectable()
export default class CheckUserByIdService extends PostService {
  url = apiUrl + 'checkUserById.php';

  callService(item: Object): Observable<void> {
    // console.log(item);
    this.headers = getAuthHeaders();
    return super.callService(item);
  }
}
