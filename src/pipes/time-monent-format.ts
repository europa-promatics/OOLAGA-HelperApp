import { Injectable, Pipe } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'timemomentformat'
})
@Injectable()
export class TimeMomentFormat {
   transform(value: string, format: string = "hh:mm a"): string {
        if (value=='SELECT A TIME' || !value) {
            return value;
        }
        let val='2017-04-29T'+value+':00.00Z'
        console.log(value)
        format='h:mm a';
        return moment(val).utc().format(format)
    }
}
@Pipe({
  name: 'timerforCancelOolaga'
})
@Injectable()
export class TimerforCancelOolaga {
	  transform(value: number, format: string = "hh:mm a"): string {
        let a=value
        let b=Date.parse(new Date().toString())
        if(a>b){
          let c=(a-b)/1000
          return (Math.floor(c/(60*60))).toString()+'h '+(Math.floor((c%(60*60))/60)).toString()+'m'
        }else{return 'Waiting.'}
    }
 
}
@Pipe({
  name: 'infoFilter'
})
@Injectable()
export class InfoFilter {
   transform(value: string): string {
     let b='';
        if (value=='SELECT A TIME' || !value) {
            return value;
        }
        let a = value.split('\n');
        for(let i=0;i<a.length;i++){
          b=b+a[i]
          if(i!=a.length-1){
            b=b+'<br />'
          }
        }
        return b
  }
}
@Pipe({
  name: 'dateConvert'
})
@Injectable()
export class DateConvert {
   transform(value: string): string {
        if (value=='SELECT A TIME' || !value) {
            return value;
        }
        let a = value;/*.split('-').reverse().toString().replace(',','-').replace(',','-');*/
        return a
  }
}
