import { Component, OnInit, OnDestroy, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

/*service*/
import { AppStateService } from '../../_services/index';
import { DeviceService } from '../../_services/index';

/*import jquery*/
import * as $ from 'jquery';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls : [
                    '../../_css/common.css',
                    '../../_css/contact.css'
                ],
})
export class ContactComponent implements OnInit, OnDestroy {

    public _contact : any; // contact data bind
    private _deviceInfoHandler; // device Info - subscribe

    constructor(
        private _appState : AppStateService,
        private _device : DeviceService,
        @Inject(DOCUMENT) private _dom: Document,
    ) {
        this.registerTwoWayBind();
    }

    ngOnInit() {
        this._deviceInfoHandler = this._device.getDeviceInfoSubscribe()
            .subscribe((r_notice) => {
                this._contact.device = r_notice;
                return;
            });
    }

    ngOnDestroy() {
        this._deviceInfoHandler.unsubscribe();
    }

    registerTwoWayBind(){
        this._contact = {
            'data' : [
                {'title' : 'phone', 'value' : '+82 10 3131 2188', 'src' : '/assets/phone-icon.png'},
                {'title' : 'mail', 'value' : 'kwyj0211@gmail.com', 'src' : '/assets/mail-icon.png'},
                {'title' : 'github', 'value' : 'https://github.com/kwyj02111', 'src' : '/assets/github-white-icon.svg'},
            ],
            'fullScreen' : false,
            'device' : this._device.getDeviceInfo(),
        };

        return;
    }

    // window resize
    @HostListener('window:resize', ['$event']) onResize($event) {
        let width = this._dom.body.clientWidth;
        this._device.updateDeviceInfo(width);
        return;
    }

    // 창 끄기
    closeApp(){
        this._appState.updateAppState('contact', 'close');
        return;
    }

    // 창 최소화
    MinimizeApp(){
        $('#contactContainer').addClass('minimize');
        return;
    }

    // 창 전체화면
    fullScreenApp(){

        if(this._contact.device.isMobile){
            return;
        }

        let screen = this._contact.fullScreen;

        if(screen){
            this._contact.fullScreen = false;
        } else {
            this._contact.fullScreen = true;
        }

        return;
    }
}
