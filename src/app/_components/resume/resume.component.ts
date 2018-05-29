import { Component, OnInit, OnDestroy, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

/*service*/
import { AppStateService } from '../../_services/index';
import { DeviceService } from '../../_services/index';

/*import underscore*/
import * as _ from 'underscore';

@Component({
    selector: 'resume',
    templateUrl: './resume.component.html',
    styleUrls : [
                    '../../_css/common.css',
                    '../../_css/resume.css'
                ],
})

export class ResumeComponent implements OnInit, OnDestroy {

    public _resume : any; // resume data bind
    private _appStateHandler; // App State - subscribe
    private _deviceInfoHandler; // device Info - subscribe

    constructor(
        private _appState : AppStateService,
        private _device : DeviceService,
        @Inject(DOCUMENT) private _dom: Document,
    ) {
        this.registerTwoWayBind();
        this.setComponentZindex();
    }

    ngOnInit() {
        this._appStateHandler = this._appState.getAppStateSubscribe()
            .subscribe((r_notice) => {
                this.setComponentZindex();
                return;
            });

        this._deviceInfoHandler = this._device.getDeviceInfoSubscribe()
            .subscribe((r_notice) => {
                this._resume.device = r_notice;
                return;
            });
    }

    ngOnDestroy() {
        this._appStateHandler.unsubscribe();
        this._deviceInfoHandler.unsubscribe();
    }

    registerTwoWayBind(){
        this._resume = {
            'fullScreen' : false,
            'device' : this._device.getDeviceInfo(),
            'zindex' : 0,
        };

        return;
    }


    setComponentZindex(){

        let stateArray = this._appState.getAppState().appArray;
        let idx = _.findIndex(stateArray, { component : 'resume' });

        if(idx < 0){
            return;
        }

        this._resume.zindex = idx + 101;
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
        this._appState.updateAppState('resume', 'close');
        return;
    }

    // 창 최소화
    MinimizeApp(){
        $('#resumeContainer').addClass('minimize');
        return;
    }

    // 창 전체화면
    fullScreenApp(){

        if(this._resume.device.isMobile){
            return;
        }

        let screen = this._resume.fullScreen;

        if(screen){
            this._resume.fullScreen = false;
        } else {
            this._resume.fullScreen = true;
        }

        return;
    }
}
