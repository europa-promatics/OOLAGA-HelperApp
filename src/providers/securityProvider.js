var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserProvider } from '../providers/userProvider';
import { ENV } from '../app/env';
var SecurityProvider = /** @class */ (function () {
    function SecurityProvider(http, userProvider) {
        this.http = http;
        this.userProvider = userProvider;
        console.log('Hello SecurityProvider Provider');
    }
    SecurityProvider.prototype.find = function () {
    };
    SecurityProvider.prototype.track = function (id, lat, long) {
        console.log(id);
        console.log(lat);
        console.log(long);
        return this.http.post(ENV.mainApi + '/add_track_helper', {
            user_id: id,
            longitude: long,
            latitude: lat
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.login = function (user, pass, uuid, platform) {
        return this.http.post(ENV.mainApi + '/webservicelogin', {
            email: user,
            password: pass,
            user_type: 1,
            device_id: uuid,
            device_type: platform,
            device_token: localStorage['token']
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.ragister = function (firstname, lastname, email, number, user_type, password) {
        return this.http.post(ENV.mainApi + '/webservicesignup', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            number: number,
            user_type: user_type,
            password: password,
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.get_user_data = function () {
        return this.http.get(ENV.mainApi + '/webservice_get_helper_rating/' + this.userProvider.user.id)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.saveData = function (distance, stairs, elevator, days) {
        console.log(distance, stairs, elevator, days);
        return distance + stairs + elevator + days;
    };
    SecurityProvider.prototype.acceptOolaga = function (oolaga_id, helper_id) {
        return this.http.post(ENV.mainApi + '/helperserviceshelperdetailproposal', {
            oolaga_id: oolaga_id,
            helper_id: helper_id
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.saveSettings = function (distance, stairs, elevator, days, zip_code, on_working_hour, push) {
        console.log(days);
        return this.http.post(ENV.mainApi + '/helperserviceshelperdetailsave', {
            helper_id: this.userProvider.user.id,
            monday: days[0].status,
            tuesday: days[1].status,
            wednesday: days[2].status,
            thursday: days[3].status,
            friday: days[4].status,
            saturday: days[5].status,
            sunday: days[6].status,
            elevator: elevator == true ? 1 : 0,
            stairs: stairs == true ? 1 : 0,
            distance: distance,
            zip_code: zip_code,
            on_working_hour: on_working_hour == true ? 1 : 0,
            push: push == true ? 'Active' : 'Inactive'
        })
            .timeout(ENV.timeout)
            .map(function (data) {
            console.log(JSON.parse(data['_body']));
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.getSettingsData = function (helper_id) {
        return this.http.get(ENV.mainApi + '/helperserviceshelperdetail/' + helper_id)
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.trackOollaga = function (oolaga_id) {
        return this.http.post(ENV.mainApi + '/helperservicestrackoolaga', { oolaga_id: oolaga_id })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.getOolaga = function (helper_id) {
        return this.http.get(ENV.mainApi + '/helperserviceshelperdetailfilter/' + helper_id)
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.enterbid = function (oolaga_id, helper_id, bid_amount) {
        return this.http.post(ENV.mainApi + '/webservicebidding', { oolaga_id: oolaga_id, helper_id: helper_id, bid_amount: bid_amount })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.contactus = function (name, email, description, phone) {
        return this.http.post(ENV.mainApi + '/webservicecontactUs', { name: name, email: email, description: description, phone: phone })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.getmyolaga = function (helper_id) {
        return this.http.post(ENV.mainApi + '/helperservicesshowmyoolaga', { helper_id: helper_id })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.notification = function (helper_id) {
        return this.http.post(ENV.mainApi + '/helperservicesshownotification', { helper_id: helper_id })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.deletenoty = function (noty_id) {
        return this.http.post(ENV.mainApi + '/helperservicesdeletenotification/' + noty_id, { id: noty_id })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.trackolaga = function (helper_id, current_long, current_lat) {
        return this.http.post(ENV.mainApi + '/trackoolaga', { helper_id: helper_id, current_longitude: current_long, current_latitude: current_lat })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.checkNotifications = function (helper_id) {
        return this.http.post(ENV.mainApi + '/helperservicesreadnotication', { helper_id: helper_id })
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.deleteNotification = function (id) {
        return this.http.get(ENV.mainApi + '/webservicedeletenoti/' + id)
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.cancelOolaga = function (value) {
        return this.http.post(ENV.mainApi + '/helperservicescancelhelper', value)
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.payments = function (helper_id) {
        return this.http.get(ENV.mainApi + '/helperservicestotalearn/' + helper_id)
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.getReasons = function () {
        return this.http.get(ENV.mainApi + '/helperservicescancelationreasons')
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.getStatistics = function (value) {
        ///oolaga/helperservicesnotifyoolaga/4
        return this.http.get(ENV.mainApi + '/helperservicesnotifyoolaga/' + value)
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.viewOolaga = function (value) {
        return this.http.post(ENV.mainApi + '/helperservicesviewoolaga', value)
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider.prototype.getOolagaDetailsById = function (body) {
        ///oolaga/helperservicesnotifyoolaga/4
        return this.http.post(ENV.mainApi + '/getOolagaById', body)
            .timeout(ENV.timeout)
            .map(function (data) {
            return data.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    SecurityProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, UserProvider])
    ], SecurityProvider);
    return SecurityProvider;
}());
export { SecurityProvider };
//# sourceMappingURL=securityProvider.js.map