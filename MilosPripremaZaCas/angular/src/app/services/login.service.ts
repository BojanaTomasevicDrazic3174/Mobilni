import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Injectable} from "@angular/core";
import {apiUrl} from "../constants";
import PostService from "./post.service";

@Injectable()
export class LoginService extends PostService{
   url = apiUrl + 'loginservice.php';
}
