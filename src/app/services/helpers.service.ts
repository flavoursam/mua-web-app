import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
    
    static yearHelper(year) {
        const yyyy = '' + year;
        return yyyy;
    }

    static monthHelper(month) {
        let mm;
        if (month < 10) {
            mm = '0' + month;
        } else {
            mm = '' + month;
        }
        return mm;
    }

    static dayHelper(day) {
        let dd;
        if (day < 10) {
            dd = '0' + day;
        } else {
            dd = '' + day;
        }
        return dd;
    }



  constructor() { }
}
