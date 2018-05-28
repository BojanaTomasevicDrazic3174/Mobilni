
import {Headers} from '@angular/http';
export const apiUrl = 'http://localhost:8080/phpispit-april/';


export function prepareFormData(item: Object): String{
  let result = '';
  Object.keys(item).forEach(key => {
    let append = (encodeURIComponent(key) + '=' + encodeURIComponent(item[key]));
    if(encodeURIComponent(item[key]) == 'null'){
      append = encodeURIComponent(key) + '=';
    }
    result += (result == '') ? append : '&' + append;
  });
  return result;
}

export const defaultPostHeaders = new Headers( {'Content-Type':'application/x-www-form-urlencoded'});

export function parseErrorToAlert(err: Object){
  let obj = JSON.parse(err['_body']);
  let element = <HTMLElement>document.getElementsByClassName('alert')[0];
  element.style.display = 'block';
  element.innerHTML = obj.error.split('\\r\\n').join('<br/>').split('\"').join('');
}

export function getAuthHeaders() : Headers {
  return  new Headers( {'Content-Type':'application/x-www-form-urlencoded', 'token': localStorage.getItem('token')});
}
