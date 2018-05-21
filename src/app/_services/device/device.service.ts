import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DeviceService {

    private _device : any;
    private _deviceSubject = new Subject<any>(); //device Subject

    constructor(
        @Inject(DOCUMENT) private _dom: Document
    ) { }

    setDeviceInfo(info : any){

        if(typeof info === 'undefined'){
            return;
        }

        let check = false;

        // device value =>
        //    'android' : Sumsung, Lg, Nexus, pixel
        //    'iphone' : iphone
        //    'windows-phone' : Lumia
        //    'unknown' : Blackberry, Nokia, Desktop
        //    'ipad' : ipad
        if(info.device !== 'unknown' && info.device !== 'ipad'){
            check = true;
        }

        // clientWidth 768 기준으로 작으면 mobile 기기로 인식하도록 함.
        if(this._dom.body.clientWidth <= 768){
            check = true;
        }

        let deviceInfo = {
            'info' : info,
            'windowWidth' : this._dom.body.clientWidth,
            'windowHeight' : this._dom.body.clientHeight,
            'isMobile' : check
        };

        this._device = deviceInfo;
        this._deviceSubject.next(<any> this._device);
        return;
    }

    getDeviceInfo(){
        return this._device;
    }

    getDeviceInfoSubscribe() : Observable<any> {
        return this._deviceSubject.asObservable();
    }

    updateDeviceInfo(width : any){

        if(typeof width === 'undefined'){
            return;
        }

        let check = false;

        // clientWidth 768 기준으로 작으면 mobile 기기로 인식하도록 함.
        if(width <= 768){
            check = true;
        }

        this._device['windowWidth'] = width;
        this._device['isMobile'] = check;

        this._deviceSubject.next(<any> this._device);
        return;
    }

}
