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
		
        let b=new Date();
        return this.milliseconds(new Date(a).getTime()-b.getTime());
    }
	
	milliseconds(date_future){  
		
var seconds=date_future*0.001;

var numdays = Math.floor(seconds / 86400);

var numhours = Math.floor((seconds % 86400) / 3600);

var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);

var numseconds = ((seconds % 86400) % 3600) % 60;

if(numdays>0){
	if(numdays==1){
			return numdays + " jour ";
	}
	else{
		return numdays + " jours ";
	}
	// + numhours + " hours " + numminutes + " minutes ";
}else{
	if(numhours > 0){
		return  numhours + "h" + numminutes + "m";
	}else{
		if(numminutes > 0){
			return numminutes + "m";
		}else{
			return "Expired"
		}
	}
}

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
