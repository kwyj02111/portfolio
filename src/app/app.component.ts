import { Component, OnInit } from '@angular/core';

/*service*/
import { AppStateService } from './_services/index';
import { DeviceService } from './_services/index';

/*module*/
import { Ng2DeviceService } from 'ng2-device-detector';

/*import jquery*/
import * as $ from 'jquery';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './_css/common.css'
    ],
})
export class AppComponent implements OnInit {

    public _mainApp : any;

    constructor(
        private _appState : AppStateService,
        private _device : DeviceService,
        private deviceService: Ng2DeviceService,
    ) {
        this.appState();
        this.deviceInfo();
    }

    ngOnInit() {
    }

    appState(){
        this._mainApp = this._appState.getAppState();
        return;
    }

    deviceInfo(){
        let deviceInfo = this.deviceService.getDeviceInfo();
        this._device.setDeviceInfo(deviceInfo);
        return;
    }
}
