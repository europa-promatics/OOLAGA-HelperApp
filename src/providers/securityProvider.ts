import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";
import {UserProvider} from '../providers/userProvider';
import {ENV} from '../app/env'
import { Geolocation } from '@ionic-native/geolocation';
@Injectable()
export class SecurityProvider {

  constructor(public http: Http,private userProvider:UserProvider){
    console.log('Hello SecurityProvider Provider');
  }
  find(){

  }
  track(id,lat,long):Observable<any>{
    console.log(id)
    console.log(lat)
    console.log(long)
    return this.http.post(ENV.mainApi+'/add_track_helper',{
      user_id:id,
      longitude:long,
      latitude:lat
    })
    .timeout(ENV.timeout)
    .map((data)=>{
      return data.json();
    })
    .catch(error => {
              return error
            })
  }
  login(user,pass,uuid,platform): Observable<any>{
  	return this.http.post(ENV.mainApi+'/webservicelogin',{
  																												email: user,
  																												password: pass,
  																												user_type:1,
                                                          device_id:uuid,
                                                          device_type:platform,
                                                          device_token:localStorage['token']
  																											})
            .timeout(ENV.timeout)
            .map((data)=>{
              return data.json()
            })
            .catch(error => {
              return error
            })
  }
  ragister(firstname,lastname,email,number,user_type,password): Observable<any>{
    return this.http.post(ENV.mainApi+'/webservicesignup',{
                                                          firstname:firstname,
                                                          lastname:lastname,
                                                          email:email,
                                                          number:number,
                                                          user_type:user_type,
                                                          password:password,
                                                        })
    .timeout(ENV.timeout)
    .map((data)=>{
      return data.json()
    })
    .catch(error => {
              return error
    })
  } 
  CustomerReview(courtesy,timeliness,accuracy,oolaga_id,customer_id,helper_id): Observable<any>{
    return this.http.post(ENV.mainApi+'/webservicesave_customer_rating',{
                                                          courtesy:courtesy,
                                                          timeliness:timeliness,
                                                          accuracy:accuracy,
                                                          oolaga_id:oolaga_id,
                                                          customer_id:customer_id,
                                                          helper_id:helper_id,
                                                        })
    .timeout(ENV.timeout)
    .map((data)=>{
      return data.json()
    })
    .catch(error => {
              return error
    })
  }
  
    getInfo(helper_id, customer_id, oolaga_id): Observable<any>{
    return this.http.post(ENV.mainApi+'/webservicegetalldeliveredoolaga',{
                                                          customer_id:customer_id,
                                                          helper_id:helper_id,
														  oolaga_id:oolaga_id
                                                         
                                                        })
    .timeout(ENV.timeout)
    .map((data)=>{
      return data.json()
    })
    .catch(error => {
              return error
    })
  }
  get_user_data():Observable<any>{
    return this.http.get(ENV.mainApi+'/webservice_get_helper_rating/'+this.userProvider.user.id)
    .map((data)=>{
      return data.json()
    })
    .catch(error => {
              return error
            })
  }
  saveData(distance,stairs,elevator,days): Observable<any>{
    console.log(distance,stairs,elevator,days)
    return distance + stairs + elevator + days;
  }
  acceptOolaga(oolaga_id,helper_id){
    return this.http.post(ENV.mainApi+'/helperserviceshelperdetailproposal',{
                                                          oolaga_id:oolaga_id,
                                                          helper_id:helper_id
                                                        })
    .timeout(ENV.timeout)
    .map((data)=>{
      return data.json()
    })
    .catch(error => {
              return error
            })
  }
  saveSettings(distance,stairs,elevator,days,zip_code,on_working_hour,push, country):Observable<any>{
    console.log(days)
    return this.http.post(ENV.mainApi + '/helperserviceshelperdetailsave' ,{
                                                                            helper_id: this.userProvider.user.id,
                                                                            monday:days[0].status,
                                                                            tuesday:days[1].status,
                                                                            wednesday:days[2].status,
                                                                            thursday:days[3].status,
                                                                            friday:days[4].status,
                                                                            saturday:days[5].status,
                                                                            sunday:days[6].status,
                                                                            elevator:elevator==true?1:0,
                                                                            stairs:stairs==true?1:0,
                                                                            distance:distance,
                                                                            zip_code:zip_code,
                                                                            on_working_hour:on_working_hour==true?1:0,
                                                                            push:push==true?'Active':'Inactive',
																			
																			country:country
                                                                          })
            .timeout(ENV.timeout)
            .map((data)=>{
              console.log(JSON.parse(data['_body']))
            })
            .catch(error => {
              return error
            })
  }
  getSettingsData(helper_id):Observable<any>{
    return this.http.get(ENV.mainApi + '/helperserviceshelperdetail/' + helper_id)
            .timeout(ENV.timeout)
            .map((data)=>{
              return data.json()
            })
            .catch(error => {
              return error
            })
  }
  trackOollaga(oolaga_id):Observable<any>{
    return this.http.post(ENV.mainApi + '/helperservicestrackoolaga',{oolaga_id:oolaga_id})
            .timeout(ENV.timeout)
            .map((data)=>{
              return data.json()
            })
            .catch(error => {
              return error
            })
  }

  getOolaga(helper_id): Observable<any>{
    return this.http.get(ENV.mainApi + '/helperserviceshelperdetailfilter/' + helper_id)
            .timeout(ENV.timeout)
            .map((data)=>{
              return data.json()
            })
            .catch(error => {
              return error
            })
  }
                 
enterbid(oolaga_id,helper_id,bid_amount):Observable<any>{
  console.log(helper_id)
 return this.http.post(ENV.mainApi + '/webservicebidding',{oolaga_id:oolaga_id,helper_id:helper_id,bid_amount:bid_amount})
            .timeout(ENV.timeout)
            .map((data)=>{
              return data.json()
            })
            .catch(error => {
              return error
            })
  }


contactus(name,email,description,phone):Observable<any>{
return this.http.post(ENV.mainApi + '/webservicecontactUs',{name:name,email:email,description:description,phone:phone})
            .timeout(ENV.timeout)
            .map((data)=>{
              return data.json()
            })
            .catch(error => {
              return error
            })

}
getmyolaga(helper_id):Observable<any>{
return this.http.post(ENV.mainApi+'/helperservicesshowmyoolaga',{helper_id:helper_id})
        .timeout(ENV.timeout)
        .map((data)=>{
                    return data.json()
                  })
            .catch(error => {
              return error
            })

}

getOneOolaga(oolaga_id):Observable<any>{
return this.http.post(ENV.mainApi+'/getOolagaById',{oolaga_id:oolaga_id})
        .timeout(ENV.timeout)
        .map((data)=>{
                    return data.json()
                  })
            .catch(error => {
              return error
            })

}

notification(helper_id):Observable<any>{
  return this.http.post(ENV.mainApi+'/helperservicesshownotification',{helper_id:helper_id})
    .timeout(ENV.timeout)
    .map((data)=>{
        return data.json()
      })
    .catch(error =>{
       return error
    })
}
deletenoty(noty_id):Observable<any>{
  return this.http.post(ENV.mainApi+'/helperservicesdeletenotification/'+noty_id,{id:noty_id})
    .timeout(ENV.timeout)
    .map((data)=>{
        return data.json()
      })
    .catch(error =>{
      return error
    })
}
trackolaga(helper_id,current_long,current_lat):Observable<any>{
  return this.http.post(ENV.mainApi+'/trackoolaga',{helper_id:helper_id,current_longitude:current_long,current_latitude:current_lat}) 
    .timeout(ENV.timeout)
    .map((data)=>{
        return data.json()
      })
    .catch(error =>{
       return error
    })
}
checkNotifications(helper_id):Observable<any>{
  return this.http.post(ENV.mainApi+'/helperservicesreadnotication',{helper_id:helper_id}) 
    .timeout(ENV.timeout)
    .map((data)=>{
        return data.json()
      })
    .catch(error =>{
       return error
    })
}
deleteNotification(id):Observable<any>{
  return this.http.get(ENV.mainApi+'/webservicedeletenoti/'+id)
  .timeout(ENV.timeout)
  .map((data)=>{
    return data.json()
  })
  .catch(error =>{
    return error
  })
}
cancelOolaga(value):Observable<any>{
  return this.http.post(ENV.mainApi+'/helperservicescancelhelper',value) 
    .timeout(ENV.timeout)
    .map((data)=>{
        return data.json()
      })
    .catch(error =>{
       return error
    })
}
payments(helper_id):Observable<any>{
  return this.http.get(ENV.mainApi+'/helperservicestotalearn/'+helper_id) 
    .timeout(ENV.timeout)
    .map((data)=>{
        return data.json()
      })
    .catch(error =>{
       return error
    })
}
getReasons():Observable<any>{
  return this.http.get(ENV.mainApi+'/helperservicescancelationreasons') 
    .timeout(ENV.timeout)
    .map((data)=>{
        return data.json()
      })
    .catch(error =>{
       return error
    })
}
getStatistics(value):Observable<any>{
///oolaga/helperservicesnotifyoolaga/4
  return this.http.get(ENV.mainApi+'/helperservicesnotifyoolaga/'+value)
    .timeout(ENV.timeout)
    .map((data)=>{
      return data.json();
    })
    .catch(error=>{
      return error;
    })
}

viewOolaga(value):Observable<any>{
  return this.http.post(ENV.mainApi+'/helperservicesviewoolaga',value)
    .timeout(ENV.timeout)
    .map((data)=>{
      return data.json();
    })
    .catch(error=>{
      return error;
    })
}

getOolagaDetailsById(body):Observable<any>{
///oolaga/helperservicesnotifyoolaga/4
   return this.http.post(ENV.mainApi+'/getOolagaById',body)
    .timeout(ENV.timeout)
    .map((data)=>{
      return data.json();
    })
    .catch(error=>{
      return error;
    })
}

postImagedemoServer(body):Observable<any>{
///oolaga/helperservicesnotifyoolaga/4
   return this.http.post('http://52.15.158.154:5001/reqestCheck/1',body)
    .timeout(ENV.timeout)
    .map((data)=>{
      return data.json();
    })
    .catch(error=>{
      return error;
    })
}
postImage(body):Observable<any>{
///oolaga/helperservicesnotifyoolaga/4
   return this.http.post(ENV.mainApi+'/webserviceAddProfileImage',body)
    .timeout(ENV.timeout)
    .map((data)=>{
      return data.json();
    })
    .catch(error=>{
      return error;
    })
}
// http://gagandeepsethi.com/oolaga/helperForgotPassword
 forgot(email): Observable<any>{
    return this.http.post(ENV.mainApi+'/helperForgotPassword',{
                                                          email: email,
                                                          user_type:1
                                                        })
            .timeout(ENV.timeout)
            .map((data)=>{
              return data.json()
            })
            .catch(error => {
              return error
            })
  }
}

