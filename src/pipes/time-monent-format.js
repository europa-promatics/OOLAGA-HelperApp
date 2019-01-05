var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, Pipe } from '@angular/core';
import * as moment from 'moment';
var TimeMomentFormat = /** @class */ (function () {
    function TimeMomentFormat() {
    }
    TimeMomentFormat.prototype.transform = function (value, format) {
        if (format === void 0) { format = "hh:mm a"; }
        if (value == 'SELECT A TIME' || !value) {
            return value;
        }
        var val = '2017-04-29T' + value + ':00.00Z';
        console.log(value);
        format = 'h:mm a';
        return moment(val).utc().format(format);
    };
    TimeMomentFormat = __decorate([
        Pipe({
            name: 'timemomentformat'
        }),
        Injectable()
    ], TimeMomentFormat);
    return TimeMomentFormat;
}());
export { TimeMomentFormat };
var TimerforCancelOolaga = /** @class */ (function () {
    function TimerforCancelOolaga() {
    }
    TimerforCancelOolaga.prototype.transform = function (value, format) {
        if (format === void 0) { format = "hh:mm a"; }
        var a = value;
        var b = Date.parse(new Date().toString());
        if (a > b) {
            var c = (a - b) / 1000;
            return (Math.floor(c / (60 * 60))).toString() + 'h ' + (Math.floor((c % (60 * 60)) / 60)).toString() + 'm';
        }
        else {
            return 'Waiting.';
        }
    };
    TimerforCancelOolaga = __decorate([
        Pipe({
            name: 'timerforCancelOolaga'
        }),
        Injectable()
    ], TimerforCancelOolaga);
    return TimerforCancelOolaga;
}());
export { TimerforCancelOolaga };
var InfoFilter = /** @class */ (function () {
    function InfoFilter() {
    }
    InfoFilter.prototype.transform = function (value) {
        var b = '';
        if (value == 'SELECT A TIME' || !value) {
            return value;
        }
        var a = value.split('\n');
        for (var i = 0; i < a.length; i++) {
            b = b + a[i];
            if (i != a.length - 1) {
                b = b + '<br />';
            }
        }
        return b;
    };
    InfoFilter = __decorate([
        Pipe({
            name: 'infoFilter'
        }),
        Injectable()
    ], InfoFilter);
    return InfoFilter;
}());
export { InfoFilter };
var DateConvert = /** @class */ (function () {
    function DateConvert() {
    }
    DateConvert.prototype.transform = function (value) {
        if (value == 'SELECT A TIME' || !value) {
            return value;
        }
        var a = value; /*.split('-').reverse().toString().replace(',','-').replace(',','-');*/
        return a;
    };
    DateConvert = __decorate([
        Pipe({
            name: 'dateConvert'
        }),
        Injectable()
    ], DateConvert);
    return DateConvert;
}());
export { DateConvert };
//# sourceMappingURL=time-monent-format.js.map