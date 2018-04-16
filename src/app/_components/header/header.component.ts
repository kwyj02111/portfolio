import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls : [
                    '../../_css/common.css',
                    '../../_css/header.css'
                ],
})

export class HeaderComponent implements OnInit {

    public _header : any;// 헤더 data bind

    constructor() {
    }

    ngOnInit() {
        this.registerTwoWayBind();
    }

    registerTwoWayBind(){
        this._header = {
            'data' : {
                'nowTime' : '',
            }
        };

        return;
    }

    getClock(){
        let hours = new Date().getHours();
        let minute = new Date().getMinutes();
        let minuteStr = '';
        let init = '';

        if(hours > 12){
            init = 'PM';
            hours = hours - 12;
        } else {
            init = 'AM';
        }

        if(minute < 10){
            minuteStr = `0${minute}`;
        } else {
            minuteStr = minute.toString();
        }

        this._header.data.nowTime =  `${hours}:${minuteStr} ${init}`;
        return this._header.data.nowTime;
    }

}
